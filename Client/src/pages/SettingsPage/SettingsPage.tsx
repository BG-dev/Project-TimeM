import React, { useState } from 'react';
import Upload, { RcFile, UploadFile, UploadProps } from 'antd/es/upload';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils/fileUtil';
import './SettingsPage.scss';

const beforeUploadImage = (file: File): boolean => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    console.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

function SettingsPage() {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setImageFileList(newFileList);
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    const preview: string = await getBase64(file.originFileObj as RcFile);

    setPreviewImage(preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className="settings">
      <div className="content">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader"
          action="/users/avatar"
          beforeUpload={beforeUploadImage}
          onChange={handleChange}
          onPreview={handlePreview}>
          {imageFileList.length === 0 ? uploadButton : null}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}>
          <img
            src={previewImage}
            alt="Avatar preview"
            style={{ width: '100%' }}
          />
        </Modal>

        <Button>Save</Button>
      </div>
    </div>
  );
}

export default SettingsPage;
