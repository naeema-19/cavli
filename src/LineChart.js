import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useDropzone } from 'react-dropzone';
import { useSpring, animated, config } from 'react-spring';

const LineChartUploader = () => {
  const [chartData, setChartData] = useState({});
  const [fileError, setFileError] = useState(null);
  const [bgStyle, setBgStyle] = useSpring(() => ({
    background: 'rgba(240, 240, 240, 0.8)',
    config: config.wobbly,
  }));

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileError(null);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result);

          setChartData({
            labels: jsonData.labels || [],
            datasets: [
              {
                label: 'Your Data',
                data: jsonData.datasets[0].data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          });
        } catch (error) {
          setFileError('Invalid JSON file format.');
        }
      };

      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.json',
    multiple: false,
  });

  const handleHover = () => {
    setBgStyle({
      background: 'rgba(224, 224, 224, 0.9)',
      config: config.stiff,
    });
  };

  const handleLeave = () => {
    setBgStyle({
      background: 'rgba(240, 240, 240, 0.8)',
      config: config.wobbly,
    });
  };

  return (
    <animated.div style={{ ...containerStyle, ...bgStyle }}>
      <h2 style={headingStyle}>Upload JSON File and View Line Chart</h2>
      <div
        {...getRootProps()}
        style={{ ...dropzoneStyle(isDragActive), ...{ cursor: isDragActive ? 'grabbing' : 'pointer' } }}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <input {...getInputProps()} />
        <p style={dropzoneText}>Drag and drop a JSON file here, or click to select one.</p>
      </div>

      {fileError && <p style={errorStyle}>{fileError}</p>}

      {chartData.labels && (
        <div style={chartContainerStyle}>
          <h3 style={chartHeadingStyle}>Line Chart</h3>
          <Line data={chartData} />
        </div>
      )}

      <div style={useCaseContainerStyle}>
        <h3 style={useCaseHeadingStyle}>Use Case</h3>
        <p style={useCaseText}>
          This application allows users to upload a JSON file containing line chart data.
          Once the file is uploaded, it will be parsed, and the corresponding line chart
          will be displayed. This can be useful for visualizing and analyzing time-series data.
        </p>
      </div>
    </animated.div>
  );
};

const containerStyle = {
  maxWidth: '800px',
  margin: 'auto',
  padding: '20px',
  borderRadius: '20px',
  boxShadow: '10px 10px 20px rgba(217, 217, 217, 0.7), -10px -10px 20px #ffffff',
};

const headingStyle = {
  textAlign: 'center',
  color: '#555',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const dropzoneStyle = (isDragActive) => ({
  border: `2px dashed ${isDragActive ? '#42a5f5' : '#cccccc'}`,
  borderRadius: '20px',
  padding: '20px',
  textAlign: 'center',
  background: 'rgba(240, 240, 240, 0.8)',
  boxShadow: 'inset 5px 5px 10px rgba(217, 217, 217, 0.7), inset -5px -5px 10px #ffffff',
  transition: 'border 0.3s ease-out, background 0.3s ease-out',
});

const dropzoneText = {
  color: '#777',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginTop: '10px',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
};

const chartContainerStyle = {
  marginTop: '20px',
  background: 'rgba(240, 240, 240, 0.8)',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '10px 10px 20px rgba(217, 217, 217, 0.7), -10px -10px 20px #ffffff',
};

const chartHeadingStyle = {
  textAlign: 'center',
  color: '#555',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const useCaseContainerStyle = {
  marginTop: '20px',
  background: 'rgba(240, 240, 240, 0.8)',
  borderRadius: '20px',
  padding: '20px',
  boxShadow: '10px 10px 20px rgba(217, 217, 217, 0.7), -10px -10px 20px #ffffff',
};

const useCaseHeadingStyle = {
  textAlign: 'center',
  color: '#555',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const useCaseText = {
  color: '#777',
};

export default LineChartUploader;
