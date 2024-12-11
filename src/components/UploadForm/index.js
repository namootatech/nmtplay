import { useState, useEffect, useRef } from 'react';
import { db, useStorage } from '@/util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/util/auth/context';
import { Badge } from '@/components/ui/badge';

const Categories = [
  {
    id: 'apps',
    title: 'Apps',
    types: [
      { id: 'android', title: 'Android' },
      { id: 'ios', title: 'iOS' },
      { id: 'windows-apps', title: 'Windows' },
      { id: 'mac', title: 'Mac Os' },
      { id: 'ubuntu', title: 'Ubuntu' },
      { id: 'linux', title: 'Linux' },
    ],
    subs: [
      { id: 'general-computer-software', title: 'General Computer Software' },
      { id: 'frp-bypass-apps', title: 'Frp Bypass', icon: 'windows' },
      { id: 'general-apps', title: 'General' },
      { id: 'pdf-viewer', title: 'Pdf Viewer' },
      { id: 'zip-extractor', title: 'Zip Extractor' },
      { id: 'code-editor', title: 'Code Editor' },
      { id: 'file-sharer', title: 'File Sharer' },
      { id: 'network', title: 'Network' },
      { id: 'device-management', title: 'Device Management' },
      { id: 'system-management', title: 'System Management' },
      { id: 'antivirus', title: 'Anti-Virus & Protection' },
      { id: 'image-viewer', title: 'Image Viewer' },
      { id: 'image-editor', title: 'Image Editor' },
      { id: 'audio-player', title: 'Audio Player' },
      { id: 'audio-editor', title: 'Audio Editor' },
      { id: 'android-system-software', title: 'Android System Software' },
      { id: 'linux-system-software', title: 'Linux System Software' },
      { id: 'windows-system-software', title: 'Windows System Software' },
      { id: 'video-player', title: 'Video Player' },
      { id: 'video-editor', title: 'Video Editor' },
      { id: 'word-processor', title: 'Word Processor' },
      { id: 'spreadsheet-editor', title: 'Spreadsheet Editor' },
      { id: 'presentation-viewer', title: 'Presentation Viewer' },
      { id: 'text-editor', title: 'Text Editor' },
      { id: 'rtf-editor', title: 'Rtf Editor' },
      { id: 'image-viewer', title: 'Image Viewer' },
      { id: 'svg-viewer', title: 'Svg Viewer' },
      { id: 'gif-viewer', title: 'Gif Viewer' },
      { id: 'webp-viewer', title: 'Webp Viewer' },
      { id: 'wav-player', title: 'Wav Player' },
      { id: 'ogg-player', title: 'Ogg Player' },
      { id: 'aac-player', title: 'Aac Player' },
      { id: 'flac-player', title: 'Flac Player' },
      { id: 'mkv-player', title: 'Mkv Player' },
      { id: 'mov-player', title: 'Mov Player' },
      { id: 'avi-player', title: 'Avi Player' },
      { id: 'webm-player', title: 'Webm Player' },
      { id: 'html-viewer', title: 'Html Viewer' },
      { id: 'json-viewer', title: 'Json Viewer' },
      { id: 'xml-viewer', title: 'Xml Viewer' },
      { id: 'python-editor', title: 'Python Editor' },
      { id: 'photoshop-viewer', title: 'Photoshop Viewer' },
      { id: 'font-viewer', title: 'Font Viewer' },
      { id: 'other-apps', title: 'Other Apps' },
    ],
  },
  {
    id: 'docs-and-forms',
    title: 'Documents & Forms',
    types: [
      { id: 'docs', title: 'Documents' },
      { id: 'doc-template', title: 'Document Templates' },
      { id: 'forms', title: 'Forms' },
      { id: 'memos', title: 'Memos' },
      { id: 'other', title: 'Other' },
    ],
    subs: [
      { id: 'cv-templates', title: 'CV Templates' },
      { id: 'cover-letters', title: 'Cover Letters' },
      { id: 'job-applications', title: 'Job Applications' },
      { id: 'job-description-templates', title: 'Job Description Templates' },
      { id: 'letter-templates', title: 'Letter Templates' },
      { id: 'contracts', title: 'Contracts' },
      { id: 'proposals', title: 'Proposals' },
      { id: 'reports', title: 'Reports' },
      { id: 'general-docs', title: 'General' },
      { id: 'presentation-templates', title: 'Presentation Templates' },
      { id: 'statement-templates', title: 'Statement Templates' },
      { id: 'email-templates', title: 'Email Templates' },
      { id: 'letter-templates', title: 'Letter Templates' },
      { id: 'government-forms', title: 'Government forms' },
      { id: 'legal-documents', title: 'Legal Documents' },
      { id: 'university-forms', title: 'University forms' },
      { id: 'graphic-design', title: 'Graphic-design' },
      { id: 'other-docs', title: 'Other Docs' },
    ],
  },
  {
    id: 'books',
    title: 'Free Books',
    types: [
      { id: 'novels', title: 'Novels' },
      { id: 'scholarly', title: 'Scholarly' },
      { id: 'general-books', title: 'General' },
      { id: 'xhosa', title: 'Xhosa' },
      { id: 'other-books', title: 'Other Books' },
    ],
    subs: [
      { id: 'science', title: 'Science' },
      { id: 'business', title: 'Business' },
      { id: 'history', title: 'History' },
      { id: 'politics', title: 'Politics' },
      { id: 'religion', title: 'Religion' },
      { id: 'other-books', title: 'Other Books' },
    ],
  },
  {
    id: 'memes',
    title: 'Memes',
    types: [
      { id: 'image', title: 'Image' },
      { id: 'gif', title: 'Gif' },
      { id: 'video', title: 'Video' },
      { id: 'other', title: 'Other' },
    ],
    subs: [
      { id: 'funny', title: 'Funny' },
      { id: 'sad', title: 'Sad' },
      { id: 'dark', title: 'Dark' },
      { id: 'heart-love', title: 'Heart love' },
      { id: 'news', title: 'News' },
      { id: 'general-memes', title: 'General Memes' },
      { id: 'other-memes', title: 'Other Memes' },
    ],
  },
  {
    id: 'courses',
    title: 'Courses',
    types: [
      { id: 'online', title: 'Online' },
      { id: 'offline', title: 'Offline' },
    ],
    subs: [
      { id: 'programming', title: 'Programming' },
      { id: 'design', title: 'Design' },
      { id: 'marketing', title: 'Marketing' },
      { id: 'business', title: 'Business' },
      { id: 'languages', title: 'Languages' },
      { id: 'other-courses', title: 'Other Courses' },
    ],
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    types: [
      { id: 'video', title: 'Video' },
      { id: 'text', title: 'Text' },
    ],
    subs: [
      { id: 'science', title: 'Science' },
      { id: 'politics', title: 'Politics' },
      { id: 'commerce', title: 'Commerce (Business)' },
      { id: 'technology', title: 'Technology' },
      { id: 'general-tuts', title: 'General' },
      { id: 'school', title: 'School' },
      { id: 'farming', title: 'Farming' },
      { id: 'electronics', title: 'Electronics' },
      { id: 'other-tutorials', title: 'Other Tutorials' },
    ],
  },
  {
    id: 'mp3',
    title: "MP3's",
    types: [
      { id: 'music', title: 'Music' },
      { id: 'podcasts', title: 'Podcasts' },
    ],
    subs: [
      { id: 'music', title: 'Music' },
      { id: 'podcasts', title: 'Podcasts' },
    ],
  },
  {
    id: 'videos',
    title: 'Videos',
    types: [
      { id: 'movies', title: 'Movies' },
      { id: 'tv-shows', title: 'TV Shows' },
      { id: 'documentaries', title: 'Documentaries' },
    ],
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
  {
    id: 'games',
    title: 'Games',
    types: [
      { id: 'pc', title: 'PC' },
      { id: 'console', title: 'Console' },
      { id: 'mobile', title: 'Mobile' },
    ],
    subs: [
      { id: 'android-games', title: 'Android' },
      { id: 'ios-games', title: 'iOS' },
      { id: 'windows-games', title: 'Windows' },
      { id: 'web-games', title: 'Web' },
      { id: 'other-games', title: 'Other' },
    ],
  },
  {
    id: 'exam-papers',
    title: 'Exam Papers & Memos',
    types: [
      { id: 'past-papers', title: 'Past Papers' },
      { id: 'memos', title: 'Memos' },
    ],
    subs: [
      { id: 'school', title: 'Secondary school' },
      { id: 'highschool', title: 'High School' },
      { id: 'tvet', title: 'TVET College' },
      { id: 'varsity', title: 'Varsity' },
      { id: 'other-exam-papers', title: 'Other' },
    ],
  },
];

const addWebsiteNameBeforeName = (fileName) => {
  return 'Nmtplay.co.za - ' + fileName;
};

export default function UploadForm({ onClose }) {
  const storage = useStorage();
  const auth = useAuth();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [tagInput, setTagInput] = useState(null);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');
  const [fileProgress, setFileProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const buildSizeString = (size) => {
    const isLessThanOneKiloByte = size === 1 || size < 1024;
    const isLessThanOneMegaByte = size >= 1 && size < 1024 * 1024;
    const isLessThanOneGigaByte = size >= 1 && size < 1024 * 1024 * 1024;
    const isLessThanOneTeraByte = size >= 1 && size < 1024 * 1024 * 1024 * 1024;
    const sizeInKiloBytes = size / 1024;
    const sizeInMegaBytes = sizeInKiloBytes / 1024;
    const sizeInGigaBytes = sizeInMegaBytes / 1024;
    const sizeInTeraBytes = sizeInGigaBytes / 1024;
    if (isLessThanOneKiloByte) return `${size} bytes`;
    if (isLessThanOneMegaByte) return `${sizeInKiloBytes.toFixed(2)} KB`;
    if (isLessThanOneGigaByte) return `${sizeInMegaBytes.toFixed(2)} MB`;
    if (isLessThanOneTeraByte) return `${sizeInGigaBytes.toFixed(2)} GB`;
    return `${sizeInTeraBytes.toFixed(2)} TB`;
  };

  const uploadFileWithProgress = (file, path, onProgress) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !fileName || !category || !subCategory || !tags) {
      setError('All fields are required.');
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      setFileProgress(0);
      setImageProgress(0);

      // Upload file
      const fileURL = await uploadFileWithProgress(
        file,
        `files/${file.name}`,
        setFileProgress
      );

      // Upload image (if provided)
      let imageURL = null;
      if (image) {
        imageURL = await uploadFileWithProgress(
          image,
          `images/${image.name}`,
          setImageProgress
        );
      }

      // Add file details to Firestore
      await addDoc(collection(db, 'files'), {
        name: fileName,
        nameLowercase: fileName.toLowerCase(),
        filename: addWebsiteNameBeforeName(file.name),
        filenameLowerCase: addWebsiteNameBeforeName(file.name).toLowerCase(),
        description,
        category,
        subCategory,
        tags,
        downloads: 0,
        url: fileURL,
        imageUrl: imageURL,
        userId: currentUser.uid,
        username: currentUser.displayName || currentUser.email,
        usernameLowercase:
          currentUser.displayName?.toLowerCase() || currentUser.email,
        createdAt: new Date(),
        type: file.type,
        size: file.size,
        sizeString: buildSizeString(file.size),
        extension: file.extension
          ? file.extension.toLowerCase()
          : file.name.split('.').pop(),
      });

      setSuccessMessage('File uploaded successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
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
        className='bg-fuchsia-500 text-white mb-4 p-2 mr-4'
      >
        Choose File
      </Button>
      {file && <p className=' text-xs text-gray-100 mb-2'>{file.name}</p>}
      {fileProgress > 0 && (
        <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
          <div
            className='bg-blue-500 h-2.5 rounded-full'
            style={{ width: `${fileProgress}%` }}
          ></div>
        </div>
      )}
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        ref={imageInputRef}
        style={{ display: 'none' }}
      />
      <Button
        type='button'
        onClick={() => imageInputRef.current.click()}
        className='bg-fuchsia-500 text-white mb-4 p-2 '
      >
        Choose Image
      </Button>
      {image && <p className='text-xs text-gray-100 mb-2'>{image.name}</p>}
      {imageProgress > 0 && (
        <div className='w-full bg-gray-200 rounded-full h-2.5 mb-4'>
          <div
            className='bg-green-500 h-2.5 rounded-full'
            style={{ width: `${imageProgress}%` }}
          ></div>
        </div>
      )}
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
      {category && Categories.find((cat) => cat.id === category)?.types && (
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className='ml-4 mb-4 p-2 border rounded text-gray-600'
        >
          <option value=''>Select Type</option>
          {Categories.find((cat) => cat.id === category).types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.title}
            </option>
          ))}
        </select>
      )}
      {type &&
        category &&
        Categories.find((cat) => cat.id === category)?.subs && (
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
      {successMessage && <p className='text-green-500'>{successMessage}</p>}
      <Button type='submit' className='bg-yellow-600 mr-4'>
        Upload
      </Button>
      <Button type='button' onClick={onClose} className='bg-red-800'>
        Cancel
      </Button>
    </form>
  );
}
