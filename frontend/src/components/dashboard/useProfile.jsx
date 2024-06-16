import { useState } from 'react';
import toast from 'react-hot-toast';

const useprofile = () => {
  const [loading, setLoading] = useState(false);

  const profile = async ({
    profileImg,
    backgroundImg,
    name,
    location,
    quotes,
    aboutMe,
    contentLanguages,
    activities,
  }) => {
    const success = validateProfileData({
      profileImg,
      backgroundImg,
      name,
      location,
      quotes,
      aboutMe,
      contentLanguages,
      activities,
    });

    if (!success) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('profileImg', profileImg);
      formData.append('backgroundImg', backgroundImg);
      formData.append('name', name);
      formData.append('location', location);
      formData.append('quotes', quotes);
      formData.append('aboutMe', aboutMe);
      formData.append('contentLanguages', contentLanguages);
      formData.append('activities', activities);

      const res = await fetch('http://localhost:3000/api/profile/create', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Profile created successfully');
        // Optionally, you can reset form fields here
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const validateProfileData = ({
    profileImg,
    backgroundImg,
    name,
    location,
    quotes,
    aboutMe,
    contentLanguages,
    activities,
  }) => {
    if (!profileImg || !backgroundImg || !name || !location || !quotes || !aboutMe || !contentLanguages || !activities) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  return { loading, profile };
};

export default useprofile;
