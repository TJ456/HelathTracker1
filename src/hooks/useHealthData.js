import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useHealthData = () => {
  return useContext(UserContext);
};