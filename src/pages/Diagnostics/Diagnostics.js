import React from 'react';
import { motion } from 'framer-motion';
import DiabetesRisk from '../../components/diagnostics/DiabetesRisk/DiabetesRisk';
import HeartRisk from '../../components/diagnostics/HeartRisk/HeartRisk';
import SkinAnalysis from '../../components/diagnostics/SkinAnalysis/SkinAnalysis';
import './Diagnostics.css';

const Diagnostics = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="diagnostics"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="diagnostics-title"
        variants={itemVariants}
      >
        Advanced Health Diagnostics
      </motion.h1>
      
      <motion.p 
        className="diagnostics-subtitle"
        variants={itemVariants}
      >
        Comprehensive analysis powered by AI and medical research
      </motion.p>

      <motion.div 
        className="diagnostics-grid"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <DiabetesRisk />
        </motion.div>
        <motion.div variants={itemVariants}>
          <HeartRisk />
        </motion.div>
        <motion.div variants={itemVariants}>
          <SkinAnalysis />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Diagnostics;