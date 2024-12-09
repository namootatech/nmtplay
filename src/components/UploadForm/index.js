import { useState, useEffect, useRef } from 'react';
import { db, useStorage } from '@/util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/util/auth/context';
import { Badge } from '@/components/ui/badge';

const Categories = [
  {
    id: 'apps',
    title: 'Apps',
    subs: [
      { id: 'android', title: 'Android', icon: 'android' },
      { id: 'ios', title: 'iOS', icon: 'apple' },
      { id: 'windows-apps', title: 'Windows', icon: 'windows' },
      { id: 'computer-software', title: 'Computer Software' },
      { id: 'frp-bypass-apps', title: 'Frp Bypass', icon: 'windows' },
    ],
  },
  {
    id: 'docs-and-forms',
    title: 'Documents & Forms',
    subs: [
      { id: 'cv-templates', title: 'CV Templates' },
      { id: 'cover-letters', title: 'Cover Letters' },
      { id: 'job-applications', title: 'Job Applications' },
      { id: 'job-description-templates', title: 'Job Description Templates' },
      { id: 'letter-templates', title: 'Letter Templates' },
      { id: 'contracts', title: 'Contracts' },
      { id: 'proposals', title: 'Proposals' },
      { id: 'reports', title: 'Reports' },
      { id: 'presentation-templates', title: 'Presentation Templates' },
      { id: 'statement-templates', title: 'Statement Templates' },
      { id: 'email-templates', title: 'Email Templates' },
      { id: 'letter-templates', title: 'Letter Templates' },
      { id: 'government-forms', title: 'Government forms' },
      { id: 'legal-documents', title: 'Legal Documents' },
      { id: 'university-forms', title: 'University forms' },
    ],
  },
  {
    id: 'books',
    title: 'Free Books',
    subs: [
      { id: 'novels', title: 'Novels' },
      { id: 'scholarly', title: 'Scholarly' },
      { id: 'xhosa', title: 'Xhosa' },
    ],
  },
  { id: 'memes', title: 'Memes' },
  { id: 'courses', title: 'Courses' },
  {
    id: 'mp3',
    title: "MP3's",
    subs: [
      { id: 'music', title: 'Music' },
      { id: 'podcasts', title: 'Podcasts' },
    ],
  },
  {
    id: 'videos',
    title: 'Videos',
    subs: [
      { id: 'video', title: 'Video' },
      { id: 'movies', title: 'Movies' },
      { id: 'tv-shows', title: 'TV Shows' },
      { id: 'anime', title: 'Anime' },
      { id: 'documentaries', title: 'Documentaries' },
      { id: 'trending', title: 'Trending, Funny & Social' },
      { id: 'sports', title: 'Sports' },
      { id: 'politics', title: 'Politics & Government' },
    ],
  },
  { id: 'courses', title: 'Courses' },
  {
    id: 'games',
    title: 'Games',
    subs: [
      { id: 'android-games', title: 'Android' },
      { id: 'ios-games', title: 'iOS' },
      { id: 'windows-games', title: 'Windows' },
      { id: 'web-games', title: 'Web' },
    ],
  },
  {
    id: 'exam-papers',
    title: 'Exam Papers & Memos',
    subs: [
      { id: 'school', title: 'Secondary school' },
      { id: 'highschool', title: 'High School' },
      { id: 'tvet', title: 'TVET College' },
      { id: 'varsity', title: 'Varsity' },
    ],
  },
];

export default function UploadForm({ onClose }) {
  const storage = useStorage();
  const { user } = useAuth();
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [tagInput, setTagInput] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const taginputref = useRef(null);

  useEffect(() => {
    const { currentUser } = auth;
    setCurrentUser(currentUser);
  }, [auth]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTagInput = (e) => {
    const inputValue = e.target.value;
    setTagInput(inputValue);
  };

  const handleKeyDown = (e) => {
    console.log('keydown', e.keyCode, e.key);
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const inputElement = e.target;
      const newTag = inputElement.value.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        inputElement.value = '';
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(''); // Reset subcategory when category changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !fileName || !category || !subCategory || !tags) {
      setError('All fields are required.');
      return;
    }

    try {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Add file details to Firestore
      await addDoc(collection(db, 'files'), {
        name: fileName,
        filename: file.name,
        description,
        category,
        subCategory,
        tags,
        downloads: 0,
        url: downloadURL,
        userId: currentUser.uid,
        username: currentUser.gama || currentUser.displayname,
        createdAt: new Date(),
      });

      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-gray-800 text-white p-6 my-6 rounded-lg shadow-md'
    >
      <h2 className='text-lg font-semibold mb-4'>Upload File</h2>
      <input
        type='file'
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <Button
        type='button'
        onClick={handleButtonClick}
        className='bg-fuchsia-500 text-white mb-4 p-2'
      >
        Choose File
      </Button>
      {file && <p className=' text-xs text-gray-100 mb-2'>{file.name}</p>}
      <Input
        type='text'
        placeholder='File Name'
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        required
        className='mb-4 p-2'
      />
      <textarea
        placeholder='Description (optional)'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='mb-4 p-2 text-gray-600 border rounded flex-grow border-none focus:ring-0 w-full'
        rows={4}
      />
      <select
        value={category}
        onChange={handleCategoryChange}
        required
        className='mb-4 p-2 border rounded text-gray-600'
      >
        <option value=''>Select Category</option>
        {Categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>
      {category && Categories.find((cat) => cat.id === category)?.subs && (
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
          className='ml-4 mb-4 p-2 border rounded text-gray-600'
        >
          <option value=''>Select Sub Category</option>
          {Categories.find((cat) => cat.id === category).subs.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.title}
            </option>
          ))}
        </select>
      )}
      <div className='flex flex-wrap items-center gap-2 p-2 border rounded mb-4'>
        {tags.map((tag) => (
          <Badge key={tag} variant='secondary' className='px-2 py-1'>
            {tag}
            <button
              type='button'
              onClick={() => removeTag(tag)}
              className='ml-2 text-xs font-semibold'
            >
              ×
            </button>
          </Badge>
        ))}
        <Input
          type='text'
          placeholder='Add tags (press Enter or comma to add)'
          onKeyDown={handleKeyDown}
          onChange={handleTagInput}
          value={tagInput}
          className='flex-grow border-none focus:ring-0'
          ref={taginputref}
        />
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      <Button type='submit' className='bg-yellow-600 mr-4'>
        Upload
      </Button>
      <Button type='button' onClick={onClose} className='bg-red-800'>
        Cancel
      </Button>
    </form>
  );
}
