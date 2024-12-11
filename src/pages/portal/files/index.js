import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/util/firebase';
import PortalLayout from '@/components/layout/portal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReactPaginate from 'react-paginate';
import { useAuth } from '@/util/auth/context';
import UploadForm from '@/components/UploadForm';

export default function Home() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUploadFormOpen, setIsUploadFormOpen] = useState();
  const itemsPerPage = 10;

  const auth = useAuth();

  useEffect(() => {
    const { currentUser } = auth;
    setCurrentUser(currentUser);
    console.log('setting current user', currentUser);
  }, [auth]);

  useEffect(() => {
    if (currentUser) {
      fetchFiles();
    }
  }, [currentUser]);

  const fetchFiles = async (search) => {
    try {
      console.log('fetching files', currentUser);
      const q =
        search === true && searchTerm
          ? query(
              collection(db, 'files'),
              where('nameLowercase', '>=', searchTerm),
              where('userId', '==', currentUser.uid)
            )
          : query(
              collection(db, 'files'),
              where('userId', '==', currentUser.uid)
            );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const filesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(filesData);
      });

      // Clean up the subscription when the component unmounts
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const search = () => {
    fetchFiles(true);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (fileId) => {
    // Implement file deletion logic here
    console.log('Delete file with ID:', fileId);
  };

  const requestDeletion = (fileId) => {
    // Implement file deletion request logic here
    console.log('Request deletion for file with ID:', fileId);
    const fileRef = doc(db, 'files', fileId);
    updateDoc(fileRef, {
      isRequestedForDeletion: true,
      deletionStatus: 'Pending',
    });
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = files.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(files.length / itemsPerPage);

  return (
    <div className='p-4 bg-gray-800 text-white'>
      <h1 className='text-2xl font-bold mb-4'>Free files for aba gutyuli</h1>
      <p className='mb-4'>
        View all the files you have uploaded and upload new files for abagutyuli
        to download for free
      </p>
      <nav className='flex space-x-4 mb-4'>
        <Input
          type='text'
          placeholder='Search files...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='bg-gray-200'
        />
        <Button onClick={search} className='bg-gray-900 text-white mb-4 p-2'>
          Search
        </Button>
        <Button
          onClick={() => setIsUploadFormOpen(!isUploadFormOpen)}
          className='bg-gradient-to-r from-yellow-600 to-fuchsia-900 text-white mb-4 p-2'
        >
          Upload File
        </Button>
      </nav>
      <FilesStats files={files} />
      {isUploadFormOpen && (
        <UploadForm onClose={() => setIsUploadFormOpen(false)} />
      )}
      <h2 className='text-lg font-semibold mb-4 text-white'>Uploaded Files</h2>
      <div className=' flex w-full items-center sm:justify-center'>
        <div className='w-full flex flex-col gap-4 text-sm border-separate border-spacing-y-2'>
          {currentItems.map((file) => (
            <div key={file.id} className='flex flex-col'>
              <p className='grid grid-cols-2'>
                <span className='bg-gray-300 p-2 text-gray-700'>Name: </span>
                <span className='p-2'>{file.name}</span>
              </p>
              <p className='grid grid-cols-2'>
                <span className='bg-gray-300 p-2 text-gray-700'>
                  Category:{' '}
                </span>
                <span className='p-2'>{file.category}</span>
              </p>
              <p className='grid grid-cols-2'>
                <span className='bg-gray-300 p-2 text-gray-700'>
                  Sub Category:
                </span>
                <span className='p-2'>{file.subCategory}</span>
              </p>
              <p className='grid grid-cols-2'>
                <span className='bg-gray-300 p-2 text-gray-700'>Tags: </span>
                <span className='p-2'>{file.tags.join(', ')}</span>
              </p>
              <p className='grid grid-cols-2'>
                <span className='bg-gray-300 p-2 text-gray-700'>
                  Downloads:
                </span>
                <span className='p-2'>{file.downloads}</span>
              </p>

              {/* deletion status */}
              {file.deletionStatus && (
                <p className='grid grid-cols-2 bg-red-300'>
                  <span className='bg-gray-300 p-2 text-gray-700'>
                    Deletion Status:
                  </span>
                  <span className='p-2'>{file.deletionStatus}</span>
                </p>
              )}

              <p className='td-class'>
                <Button
                  className='bg-yellow-800'
                  onClick={() => requestDeletion(file.id)}
                >
                  Delete
                </Button>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-4 text-gray-700'>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName='flex justify-center space-x-2 text-gray-700'
          activeClassName='bg-blue-500 text-f px-4 py-2 rounded'
          pageClassName='px-3 py-1 border rounded'
          previousClassName='px-3 py-1 border rounded'
          nextClassName='px-3 py-1 border rounded'
        />
      </div>
    </div>
  );
}

function FilesStats({ files }) {
  const totalFiles = files.length;
  const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);

  return (
    <div className='grid grid-cols-2 gap-4 mb-8 text-gray-800'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-lg font-semibold'>Total Files</h2>
        <p className='text-2xl font-bold'>{totalFiles}</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-lg font-semibold'>Total Downloads</h2>
        <p className='text-2xl font-bold'>{totalDownloads}</p>
      </div>
    </div>
  );
}
