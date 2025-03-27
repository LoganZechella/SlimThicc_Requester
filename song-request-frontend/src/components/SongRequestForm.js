import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSpring, animated } from 'react-spring';
import { submitSongRequest } from '../services/api';
import NeumorphicInput from './NeumorphicInput';
import NeumorphicButton from './NeumorphicButton';
import LoadingSpinner from './LoadingSpinner';

function SongRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // Form field animations with sequential delays
  const [titleFieldStyles, titleFieldApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
    config: {
      tension: 150,
      friction: 20
    }
  }));
  
  const [artistFieldStyles, artistFieldApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
    config: {
      tension: 150,
      friction: 20
    }
  }));
  
  const [buttonStyles, buttonApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 400,
    config: {
      tension: 150,
      friction: 20
    }
  }));

  // Start animations
  useEffect(() => {
    titleFieldApi.start();
    artistFieldApi.start();
    buttonApi.start();
  }, [titleFieldApi, artistFieldApi, buttonApi]);

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
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <animated.div style={titleFieldStyles}>
        <NeumorphicInput
          id="songTitle"
          type="text"
          label="Song Title"
          placeholder="Enter song title"
          error={errors.songTitle?.message}
          {...register('songTitle', { required: 'Song title is required' })}
        />
      </animated.div>

      <animated.div style={artistFieldStyles}>
        <NeumorphicInput
          id="artistName"
          type="text"
          label="Artist Name"
          placeholder="Enter artist name"
          error={errors.artistName?.message}
          {...register('artistName', { required: 'Artist name is required' })}
        />
      </animated.div>

      <animated.div style={buttonStyles} className="pt-2">
        <NeumorphicButton
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner size="sm" className="mr-2" />
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit Request'
          )}
        </NeumorphicButton>
      </animated.div>
    </form>
  );
}

export default SongRequestForm; 