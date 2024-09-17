import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Badge from 'react-bootstrap/Badge'

import { ConfirmFileDelete } from '../ConfirmFileDelete';
import { UpdateFile } from '../UpdateFile';

export const StorageItem = ({ file }) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleUpdate = () => setShowUpdate(previousShow => {
    return !previousShow
  });
  const toggleDelete = () => setShowDelete(previousShow => {
    return !previousShow
  });

  const lastDownloadDate = new Date(file.last_download);
  const newLastDownload = `${lastDownloadDate.getDate()}/${lastDownloadDate.getMonth() + 1}/${lastDownloadDate.getFullYear()}`

  const createdDate = new Date(file.created);
  const newCreated = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`

  return (
    <tr>
      <td>{file.title}</td>
      <td>{file.size}</td>
      <td>{newCreated}</td>
      <td>{newLastDownload}</td>
      <td className='storage-comment'>{file.comment}</td>
      <td>
        <Badge className='mx-4 mt-1' bg='success' text='light' onClick={toggleUpdate}>
          <FontAwesomeIcon icon="fa-solid fa-pencil" />
        </Badge>
        <Badge bg='danger' text='light' onClick={toggleDelete}>
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </Badge>
      </td>
      <UpdateFile file={file} handleClose={toggleUpdate} show={showUpdate} />
      <ConfirmFileDelete id={file.id} handleClose={toggleDelete} show={showDelete} />
    </tr>
  )
}
