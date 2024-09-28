function About() {
  return (
    <>
      <h1 className='text-6xl mb-4'>Dev Finder</h1>
      <p className='mb-4 text-2xl font-light'>
        A React app to search GitHub profiles and see profile details. Under Supervision of{' '}
        <a href='https://www.linkedin.com/in/muhammad-fareed-soyal/?originalSubdomain=pk' className='italic font-semibold' style={{ color: ' #0077B5' }} target='_blank' rel='noreferrer'>
          Sir Fareed Soyal{' '}
        </a>{' '}
      </p>
      <p className='text-lg text-gray-400'>
        Version <span className='text-white'>1.0.0</span>
      </p>
      <p className='text-lg text-gray-400'>
        Third Party Library :
        <a className='text-blue-900 font-bold underline' href='https://daisyui.com/'>
          {' '}
          Daisy-UI
        </a>
      </p>
    </>
  );
}

export default About;
