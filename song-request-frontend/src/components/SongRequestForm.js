import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { submitSongRequest } from '../services/api';

function SongRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await submitSongRequest(data);
      toast.success('Song request submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit song request. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="songTitle" className="block text-sm font-medium text-gray-700">
          Song Title
        </label>
        <input
          id="songTitle"
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.songTitle ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          {...register('songTitle', { required: 'Song title is required' })}
        />
        {errors.songTitle && (
          <p className="mt-1 text-sm text-red-600">{errors.songTitle.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="artistName" className="block text-sm font-medium text-gray-700">
          Artist Name
        </label>
        <input
          id="artistName"
          type="text"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.artistName ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          {...register('artistName', { required: 'Artist name is required' })}
        />
        {errors.artistName && (
          <p className="mt-1 text-sm text-red-600">{errors.artistName.message}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  );
}

export default SongRequestForm; 