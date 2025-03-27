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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="songTitle" className="form-label">
          Song Title
        </label>
        <input
          id="songTitle"
          type="text"
          className={`form-input ${errors.songTitle ? 'border-red-500' : ''}`}
          placeholder="Enter song title"
          {...register('songTitle', { required: 'Song title is required' })}
        />
        {errors.songTitle && (
          <p className="text-red-600 text-sm mt-1">{errors.songTitle.message}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="artistName" className="form-label">
          Artist Name
        </label>
        <input
          id="artistName"
          type="text"
          className={`form-input ${errors.artistName ? 'border-red-500' : ''}`}
          placeholder="Enter artist name"
          {...register('artistName', { required: 'Artist name is required' })}
        />
        {errors.artistName && (
          <p className="text-red-600 text-sm mt-1">{errors.artistName.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn btn-primary ${isSubmitting ? 'opacity-70' : ''}`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}

export default SongRequestForm; 