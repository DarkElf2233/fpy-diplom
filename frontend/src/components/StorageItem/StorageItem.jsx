import '../../App.css'

import Image from 'react-bootstrap/Image';

export const StorageItem = ({ file }) => {
  return (
    <div className='storage__file'>
      <Image src="https://dummyimage.com/80x80/000/fff" className='mb-2' width={80} height={80} rounded />
      <span className="storage__file-name">{file.title}</span>
    </div>
  )
}
