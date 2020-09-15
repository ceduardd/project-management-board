import React, { useState, useEffect } from 'react';

const withDataFetching = (WrapperComponent) => (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataObject = await fetch(props.dataSource);
        const dataJSON = await dataObject.json();

        // console.log(dataJSON);

        if (dataJSON) {
          setData(dataJSON);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [props]);

  return (
    <WrapperComponent data={data} loading={loading} error={error} {...props} />
  );
};

export default withDataFetching;
