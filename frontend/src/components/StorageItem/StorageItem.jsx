import '../../App.css'

export const StorageItem = ({ file }) => {
  return (
    <tr>
      <td>{file.title}</td>
      <td>{file.comment}</td>
      <td>{file.size}</td>
      <td>{file.created}</td>
      <td>{file.last_download}</td>
    </tr>
  )
}
