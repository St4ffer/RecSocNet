import React, { useState } from 'react';
import '../../App.css';
import { Image, NavDropdown } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { formatStringLength, onImageDownloadError } from '../../utils/Utils';

export const UserProfileDiminished = () => {
  const { logout } = useAuth0();
  const { currentUser, isCurrentUserAdmin } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [imageGetAttempt, setImageGetAttempt] = useState(0);

  return (
    <div>
      {currentUser && (
        <div className='no_select user_profile_diminished_container'>
          <div>
            <Image
              src={currentUser?.profilePictureUrl}
              height={50}
              width={50}
              roundedCircle={true}
              onError={({ currentTarget }) =>
                onImageDownloadError(
                  currentTarget,
                  setImageGetAttempt,
                  imageGetAttempt,
                  currentUser
                )
              }
            />
          </div>
          <div style={{ width: 'auto' }}>
            <NavDropdown
              style={{ fontSize: '30px' }}
              title={formatStringLength(currentUser?.name, 30)}
              id='navbarScrollingDropdown'
            >
              <NavDropdown.Item href={'/profile/' + currentUser?.id}>
                {t('profile')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {isCurrentUserAdmin && (
                <div>
                  <NavDropdown.Item href={'/admin'}>{t('admin_page')}</NavDropdown.Item>
                  <NavDropdown.Divider />
                </div>
              )}
              <NavDropdown.Item onClick={logout}>{t('log_out')}</NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      )}
    </div>
  );
};
