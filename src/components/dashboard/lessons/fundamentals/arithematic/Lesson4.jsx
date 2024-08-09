import React, { useState, useEffect, useRef } from 'react';
import Lesson from '../../../../code-editor/Lesson';
import Lottie from 'react-lottie';
import successAnimation1 from '../../../../../assets/animations/encouragements/excellent.json';
import successAnimation2 from '../../../../../assets/animations/encouragements/good-job.json';
import successAnimation3 from '../../../../../assets/animations/encouragements/nice.json';
import character from '../../../../../assets/animations/fundamentals/character.lottie';

const elements = [
  { variable: 'number A =' },
  { variable: 'number B =' },
  { variable: 'number D =' },
  { operation: 'number C = [A] + [B] + [D]' },
  { output: 'number C' },
];

const instructions = [
  "Drag and drop 'number A =' and input a value.",
  "Drag and drop 'number B =' and input a value.",
  "Drag and drop 'number D =' and input a value.",
  "Drag and drop 'number C = [A] + [B] + [D]' to perform the addition.",
  "Drag and drop 'number C' to display the result.",
];

const successMessage = 'Congratulations! You have successfully stored the variables and performed the addition:';

const Lesson4 = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [animationData, setAnimationData] = useState(null);
  const [startAnimation, setStartAnimation] = useState('');
  const dotLottieRef = useRef(null);

  const handlePlayLesson4 = (workspace, setOutput) => {
    let variables = {};
    let errors = [];
    let displayC = false;

    workspace.forEach((item) => {
      if (item.type === 'number A =' || item.type === 'number B =' || item.type === 'number D =') {
        if (item.value.trim() === '') {
          errors.push(`Please input a value for ${item.type}`);
        } else if (isNaN(Number(item.value.trim()))) {
          errors.push(`Value for ${item.type} should be a number`);
        } else {
          variables[item.type.split('=')[0].trim()] = {
            type: 'number',
            value: Number(item.value.trim()),
          };
        }
      } else if (item.type === 'number C = [A] + [B] + [D]') {
        if (!variables['number A'] || !variables['number B'] || !variables['number D']) {
          errors.push(`Define all 'number A =', 'number B =', and 'number D =' before using 'number C ='`);
        } else {
          variables['number C'] = {
            type: 'number',
            value: variables['number A'].value + variables['number B'].value + variables['number D'].value,
          };
        }
      } else if (item.type === 'number C') {
        displayC = true;
      } else {
        errors.push(`Unexpected variable type: ${item.type}`);
      }
    });

    if (errors.length > 0) {
      setOutput(`Errors: ${errors.join('; ')}`);
    } else if (displayC) {
      const result = Object.entries(variables)
        .map(([key, { value }]) => `${key} = ${value}`)
        .join(', ');
      setOutput(`${successMessage} ${result}`);
      setStartAnimation(successMessage);
    } else {
      setOutput(`Please include 'number C' to display the result`);
    }
  };

  useEffect(() => {
    if (dotLottieRef.current) {
      if (startAnimation === successMessage) {
        dotLottieRef.current.play();
      } else {
        dotLottieRef.current.stop();
      }
    }
  }, [startAnimation]);

  const handleNextStepLesson4 = (workspace, stepIndex, setStepIndex, setAnimationData) => {
    const steps = [
      'number A =',
      'number B =',
      'number D =',
      'number C = [A] + [B] + [D]',
      'number C',
    ];

    if (stepIndex < steps.length && workspace[stepIndex]?.type === steps[stepIndex]) {
      const successAnimations = [
        successAnimation1,
        successAnimation2,
        successAnimation3,
      ];
      const randomIndex = Math.floor(Math.random() * successAnimations.length);
      setAnimationData(successAnimations[randomIndex]);
      setStepIndex(stepIndex + 1);
    }
  };

  useEffect(() => {
    if (animationData) {
      const timer = setTimeout(() => {
        setAnimationData(null);
      }, 3000); // Display animation for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [animationData]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <h2 className='text-xl text-center font-medium mb-1'>
        Adding Three Numbers
      </h2>
      <p className='text-center'>
        <span className='font-bold'>Mission:</span> Store variables and perform addition
      </p>
      <Lesson
        elements={elements}
        instructions={instructions}
        dotLottieRef={dotLottieRef}
        outputAnimation={character}
        handlePlay={handlePlayLesson4}
        handleNextStep={(workspace) =>
          handleNextStepLesson4(
            workspace,
            stepIndex,
            setStepIndex,
            setAnimationData
          )
        }
      />
      {animationData && (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-700 bg-opacity-25'>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </div>
  );
};

export default Lesson4;
