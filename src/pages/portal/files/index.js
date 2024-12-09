import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
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
    fetchFiles();
  }, [searchTerm]);

  useEffect(() => {
    const { currentUser } = auth;
    setCurrentUser(currentUser);
  }, [auth]);

  const fetchFiles = async () => {
    try {
      const q = searchTerm
        ? query(
            collection(db, 'files'),
            where('name', '==', searchTerm),
            where('userId', '==', currentUser.uid)
          )
        : query(collection(db, 'files'));

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (fileId) => {
    // Implement file deletion logic here
    console.log('Delete file with ID:', fileId);
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
      <div className='bg-white p-6 rounded-lg shadow-md text-gray-700'>
        <h2 className='text-lg font-semibold mb-4'>Uploaded Files</h2>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='p-2 border'>File Name</th>
              <th className='p-2 border'>Category</th>
              <th className='p-2 border'>Sub Category</th>
              <th className='p-2 border'>Tags</th>
              <th className='p-2 border'>Downloads</th>
              <th className='p-2 border'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((file) => (
              <tr key={file.id} className='text-center'>
                <td className='p-2 border'>{file.name}</td>
                <td className='p-2 border'>{file.category}</td>
                <td className='p-2 border'>{file.subCategory}</td>
                <td className='p-2 border'>{file.tags.join(', ')}</td>
                <td className='p-2 border'>{file.downloads}</td>
                <td className='p-2 border'>
                  <Button onClick={() => handleDelete(file.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
