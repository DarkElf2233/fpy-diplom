import React, { Component } from 'react'

import { API_URL_STORAGE } from '../../constants'

import Table from 'react-bootstrap/Table';

import { StorageItem } from '../../components/StorageItem'

export class Storage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  componentDidMount() {
    this.getFiles()
  }

  getFiles() {
    fetch(API_URL_STORAGE + '.json').then(res => {
      return res.json()
    }).then(data => {
      this.setState({ files: data })
    })
  }

  render() {
    return (
      <div className="storage">
        <h1 className="storage__title">Ваше Хранилище</h1>
        {!this.state.files || this.state.files.length <= 0 ? (
          <p>Упс, вы ещё не загрузили ни одного файла.</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Название</th>
                <th>Комментарий</th>
                <th>Размер</th>
                <th>Дата загрузки</th>
                <th>Дата последнего скачивания</th>
              </tr>
            </thead>
            <tbody>
              {this.state.files.map(file => (
                <StorageItem file={file} />
              ))}
            </tbody>
          </Table>
        )}
      </div>
    )
  }
}
