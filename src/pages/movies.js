import React, { useState, useEffect } from 'react';
import { db } from '@/util/firebase'; // Import your Firebase configuration
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  getDoc,
  doc,
  updateDoc,
  increment,
  orderBy,
  endBefore,
  limitToLast,
} from 'firebase/firestore';
import Link from 'next/link';
import MobileDownloads, { Pagination, Table } from '@/components/page';
import { FaDownload } from 'react-icons/fa6';

const UmculoPage = () => {
  const [documents, setDocuments] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 10;

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async (direction = 'next') => {
    setLoading(true);
    setError(null);

    try {
      let q;
      if (direction === 'next' && lastDoc) {
        q = query(
          collection(db, 'files'),
          where('category', '==', 'videos'),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(docsPerPage)
        );
      } else if (direction === 'prev' && firstDoc) {
        q = query(
          collection(db, 'files'),
          where('category', '==', 'videos'),
          orderBy('createdAt', 'desc'),
          endBefore(firstDoc),
          limitToLast(docsPerPage)
        );
      } else {
        q = query(
          collection(db, 'files'),
          where('category', '==', 'videos'),
          orderBy('createdAt', 'desc'),
          limit(docsPerPage)
        );
      }

      const snapshot = await getDocs(q);

      const docsData = await Promise.all(
        snapshot.docs.map(async (d) => {
          const userRef = doc(db, 'users', d.data().userId);
          const user = await getDoc(userRef);
          return {
            id: d.id,
            ...d.data(),
            user: user.data(),
          };
        })
      );

      setDocuments(docsData);
      setFirstDoc(snapshot.docs[0]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setError('Failed to load documents. Please try again later.');
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    fetchDocuments('next');
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    fetchDocuments('prev');
  };

  const [downloadProgress, setDownloadProgress] = useState({});

  function copyLink(id, url, filename) {
    const link = `https://nmtplay.co.za/file/${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  } // Store progress per file

  const handleDownload = async (docId, url, fileName) => {
    try {
      setDownloadProgress((prev) => ({ ...prev, [docId]: 0 })); // Initialize progress

      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const totalSize = parseInt(response.headers.get('Content-Length'), 10);
      let downloadedSize = 0;

      const reader = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                setDownloadProgress((prev) => ({ ...prev, [docId]: 100 })); // Mark as complete
                return;
              }
              downloadedSize += value.length;
              const progress = Math.round((downloadedSize / totalSize) * 100);
              setDownloadProgress((prev) => ({ ...prev, [docId]: progress })); // Update progress state
              controller.enqueue(value);
              push();
            });
          }
          push();
        },
      });

      const newResponse = new Response(stream);
      const blob = await newResponse.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'download';
      link.click();

      window.URL.revokeObjectURL(downloadUrl);
      setDownloadProgress((prev) => ({ ...prev, [docId]: 100 })); // Ensure complete

      // Update download count in Firestore
      const docRef = doc(db, 'files', docId);
      await updateDoc(docRef, { downloads: increment(1) });

      setDocuments((prevDocs) =>
        prevDocs.map((doc) =>
          doc.id === docId
            ? { ...doc, downloads: (doc.downloads || 0) + 1 }
            : doc
        )
      );
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const reportVirus = async (d) => {
    const docId = d.id;
    const docRef = doc(db, 'files', docId);
    await updateDoc(docRef, {
      virusReports: increment(1),
    });

    // Update the local state to reflect the change
    setDocuments((prevDocs) =>
      prevDocs.map((d) =>
        d.id === docId ? { ...d, virusReports: (d.virusReports || 0) + 1 } : d
      )
    );
  };
  const likeFile = async (d) => {
    const docId = d.id;
    const docRef = doc(db, 'files', docId);
    await updateDoc(docRef, {
      fileLikes: increment(1),
    });

    // Update the local state to reflect the change
    setDocuments((prevDocs) =>
      prevDocs.map((d) =>
        d.id === docId ? { ...d, fileLikes: (d.fileLikes || 0) + 1 } : d
      )
    );
  };

  return (
    <section class='mt-24 min-h-screen py-8 transition-all ease-in-out min-h-max bg-gray-800 dark:bg-gray-950 flex justify-center'>
      <div className='container max-w-4xl text-white p-8'>
        <h1 className='text-gray-300 z-10 text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-yellow-400  relative dark:text-white mx-auto max-w-5xl font-bold text-4xl/tight sm:text-5xl/tight lg:text-6xl/tight xl:text-7xl/tight'>
          Videos
        </h1>
        <p className='py-8 text-xl'>
          Moja ke mgutyuli!💪🏽, kule page you will find iidownloads zee movies,
          videos, tv shows nezinye🤘🏾🕺🏽🔥
        </p>

        {error && <div className='text-red-400 text-xs py-8'>{error}</div>}
        <div className='hidden md:flex'>
          <Table
            headers={[
              'File Name',
              'Category',
              'Uploader',
              'Downloads',
              'Actions',
            ]}
            data={documents.map((doc) => ({
              fileName: (
                <p className='flex flex-col'>
                  <span className='text-xs font-bold'>{doc.name}</span>
                  <span className='flex my-2'>
                    {doc.tags.map((t) => (
                      <Link
                        href={`/tag/${t}`}
                        className='bg-gray-700 text-white p-1 text-xs rounded-md text-center mr-2'
                      >
                        {t}
                      </Link>
                    ))}
                  </span>
                </p>
              ),
              subCategory: doc.subCategory,
              username: (
                <p className='text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-yellow-400'>
                  @{doc.user.gama}
                </p>
              ),
              downloads: doc.downloads,
              actions: (
                <div key={doc.id}>
                  <a
                    href={doc.url}
                    download={doc.filename}
                    rel='noreferrer'
                    target='_blank'
                    className='bg-fuchsia-700 text-white p-1 text-xs rounded-md text-center flex gap-2'
                    onClick={() =>
                      handleDownload(doc.id, doc.url, doc.filename)
                    }
                  >
                    Gutyu!
                  </a>

                  {/* Show progress bar if download is in progress */}
                  {downloadProgress[doc.id] !== undefined &&
                    downloadProgress[doc.id] < 100 && (
                      <progress
                        value={downloadProgress[doc.id]}
                        max='100'
                        className='w-full mt-2'
                      />
                    )}
                  <button
                    className='bg-yellow-700 text-white p-1 text-xs rounded-md text-center flex gap-2 mt-2'
                    onClick={() => copyLink(doc.id, doc.url, doc.filename)}
                  >
                    Copy Link & Share!
                  </button>
                </div>
              ),
            }))}
            loading={loading}
          />
        </div>
        <div className='flex md:hidden'>
          <MobileDownloads
            items={documents}
            handleDownload={(doc) =>
              handleDownload(doc.id, doc.url, doc.filename)
            }
            handleReportVirus={reportVirus}
            handleLike={likeFile}
            loading={loading}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
          disableNext={documents.length < docsPerPage}
          disablePrevious={currentPage === 1}
        />
      </div>
    </section>
  );
};

export default UmculoPage;
