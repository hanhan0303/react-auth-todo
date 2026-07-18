import { MdErrorOutline } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';
import { apiClient } from './api';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';

export default function AuthModal({ onLoginSuccess }) {
  const testAuth = { email: 'tenderiloveu@gmail.com', password: '123456' };
  const [formData, setFormData] = useState(testAuth);
  const [errorMessage, setErrorMessage] = useState('');
  const [mode, setMode] = useState('login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient
        .post(`users/${mode === 'login' ? 'login' : 'register'}`, {
          json: formData,
        })
        .json();
      console.log(`${mode}成功 res:`, res);
      toast.success(`${mode} success`);
      setErrorMessage('');
      if (mode === 'login') {
        onLoginSuccess();
      }
    } catch (error) {
      console.error(`${mode}失敗 err:`, error);
      if (error.data) {
        const errorText = error.data.error;
        setErrorMessage(errorText);
      } else {
        setErrorMessage(
          `${mode === 'login' ? 'Email 或密碼錯誤' : '註冊失敗'}`,
        );
      }
    } finally {
      clearFormData();
    }
  };

  const clearFormData = () => {
    setFormData({ email: '', password: '' });
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-md mx-auto mt-15">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>
              {mode === 'login' ? '登入會員' : '註冊會員'}
            </FieldLegend>
            <FieldDescription>
              請輸入你的Email和密碼，
              {mode === 'login'
                ? '登入會員後即可看到你的待辦清單。'
                : '註冊完後再進行登入。'}
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  type="email"
                  className=""
                  id="email-1"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">密碼</FieldLabel>
                <Input
                  type="password"
                  id="password-1"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className=""
                  required
                />
                {errorMessage && (
                  <div className="text-sm font-medium text-destructive bg-destructive/10 p-2 rounded rounded-md flex items-center gap-2">
                    <MdErrorOutline />
                    {errorMessage}
                  </div>
                )}
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            {mode === 'login' ? (
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  handleModeChange('register');
                }}
              >
                去註冊會員
              </Button>
            ) : (
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  handleModeChange('login');
                }}
              >
                回到登入會員
              </Button>
            )}

            {mode === 'login' ? (
              <Button
                type="submit"
                onClick={() => {
                  setMode('login');
                }}
              >
                登入
              </Button>
            ) : (
              <Button type="submit">送出</Button>
            )}
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
