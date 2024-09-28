import { FaGithub } from 'react-icons/fa';

function Footer() {
  const footerYear = new Date().getFullYear();

  return (
    <footer className='footer p-4 bg-gray-700 text-primary-content footer-center text-lg'>
      <div className='text-white'>
        <FaGithub size={45} />
        <p className='mt-2'>
          Under Supervision of{' '}
          <a href='https://www.linkedin.com/in/muhammad-fareed-soyal/?originalSubdomain=pk' className='italic font-semibold' style={{ color: ' #0077B5' }} target='_blank' rel="noreferrer">
            Sir Fareed Soyal{' '}
          </a>{' '}
        </p>
        <p> Copyright &copy; {footerYear} </p>
      </div>
    </footer>
  );
}

export default Footer;
