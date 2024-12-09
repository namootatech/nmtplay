export const Table = ({ headers, data, loading }) => {
  return (
    <div className='overflow-x-autorounded-md shadow-xl'>
      {loading ? (
        <p className='text-center text-gray-500'>Loading...</p>
      ) : (
        <table className='table-auto w-full border-collapse border border-gray-300 text-white rounded-md shadow-xl overflow-hidden bg-gray-600'>
          <thead>
            <tr className='bg-gray-100 rounded-md shadow-xl'>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className='border border-gray-300 px-4 py-2 text-left text-gray-700'
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={index}
                  className='hover:bg-gray-600 hover:text-gray-800'
                >
                  {Object.values(row).map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className='border border-gray-300 px-4 py-2 text-gray-200'
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className='border border-gray-300 px-20 py-8 text-center text-gray-400'
                >
                  Akukabikho files kule section mgutyuli, ndicebisa uloge in u
                  uploade ifile so that le tafile ibene items😀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const Pagination = ({
  currentPage,
  onNextPage,
  onPreviousPage,
  disableNext,
  disablePrevious,
}) => {
  return (
    <div className='flex items-center justify-between mt-4'>
      <button
        onClick={onPreviousPage}
        disabled={disablePrevious}
        className={`px-4 py-2 bg-gray-900 text-gray-200 rounded ${
          disablePrevious
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-300'
        }`}
      >
        Previous
      </button>
      <span className='text-gray-700'>Page {currentPage}</span>
      <button
        onClick={onNextPage}
        disabled={disableNext}
        className={`px-4 py-2  bg-gradient-to-br from-fuchsia-600 to-yellow-400 text-gray-100 rounded ${
          disableNext
            ? 'bg-gray-900 opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-300'
        }`}
      >
        Next
      </button>
    </div>
  );
};
