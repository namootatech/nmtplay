import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import Head from 'next/head'; // Import Head component

// Adjust the import according to your project structure
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const FilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchFile = async () => {
        try {
          const docRef = doc(db, 'files', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setFile({ id: docSnap.id, ...docSnap.data() });
          } else {
            setError('File not found');
          }
        } catch (err) {
          setError('Failed to fetch file');
        } finally {
          setLoading(false);
        }
      };

      fetchFile();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleDownload = async () => {
    try {
      const docRef = doc(db, 'files', file.id);

      await updateDoc(docRef, { downloads: increment(1) });
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const reportVirus = async () => {
    const docId = file.id;
    const docRef = doc(db, 'files', docId);
    await updateDoc(docRef, {
      virusReports: increment(1),
    });
  };
  const likeFile = async () => {
    if (!file) {
      console.error('File is undefined');
      return;
    }

    const docId = file.id;
    console.log(file, db);
    const docRef = doc(db, 'files', docId);
    try {
      await updateDoc(docRef, {
        likes: increment(1),
      });
      alert('File liked successfully!');
    } catch (error) {
      console.error('Error liking file:', error);
      alert('Error liking file. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-4 mt-40'>
      <Head>
        <title>Download {file.name}</title>
        <meta
          name='description'
          content={`Discover the amazing ${file.name} file! Click to download now and unlock its secrets.`}
        />
      </Head>
      <div className='text-center mb-8 '>
        <h1 className='text-6xl font-bold text-fuchsia-600'>File Details</h1>
      </div>
      <div className='bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto'>
        <h2 className='text-2xl font-semibold text-fuchsia-700 mb-4'>
          {file.name}
        </h2>
        <p className='text-gray-700 mb-2'>
          Created At:{' '}
          {new Date(file.createdAt.seconds * 1000).toLocaleDateString()}
        </p>
        <p className='text-gray-700 mb-4'>Size: {formatFileSize(file.size)}</p>
        <p className='text-gray-700 mb-4'>{file.description}</p>
        <p className='text-gray-700 mb-4'>
          Downloads: {file.downloads || 0}{' '}
          <button
            onClick={likeFile}
            className='text-fuchsia-600 hover:underline'
          >
            Like
          </button>
          <button
            onClick={reportVirus}
            className='text-red-600 hover:underline ml-2'
          >
            Report Virus
          </button>
        </p>
        <a
          href={file.url}
          target='_blank'
          rel='noreferrer'
          download={file.name}
          onClick={handleDownload}
          className='bg-fuchsia-500 text-white p-2 rounded hover:bg-fuchsia-600'
        >
          Download
        </a>
      </div>
    </div>
  );
};

export default FilePage;
