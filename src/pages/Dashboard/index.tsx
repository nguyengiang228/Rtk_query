import {
  useAddExampleMutation,
  useDeleteExampleMutation,
  useGetExampleQuery,
  useUpdateExampleMutation
} from 'redux/api/api.caller';
import { StyledDashboard } from './styled';
import { useEffect, useState } from 'react';
import { IUser, IUserData, IUserEditForm } from 'interfaces/user';

const initialState: IUserData = {
  name: '',
  email: ''
};
const Dashboard = () => {
  const { data, isLoading } = useGetExampleQuery();
  const [addUser] = useAddExampleMutation();
  const [editUser] = useUpdateExampleMutation();
  const [deleteUser] = useDeleteExampleMutation();

  const [inputValue, setInputValue] = useState<IUserData | IUser>(initialState);
  const [checkErrName, setCheckErrName] = useState<string>('');
  const [checkErrEmail, setCheckErrEmail] = useState<string>('');
  const [editFormUser, setEditFormUser] = useState<IUserEditForm>({
    isEdit: true,
    id: 0
  });

  // console.log(data);

  const regx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleSetInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!inputValue.name) {
      setCheckErrName('');
    }
    setInputValue({ ...inputValue, name: e.target.value });
  };
  const handleSetInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regx.test(e.target.value)) {
      setCheckErrEmail('');
    } else {
      setCheckErrEmail('Vui lòng nhập đúng Email!');
    }
    setInputValue({ ...inputValue, email: e.target.value });
  };

  const handleSubmit = async () => {
    if (inputValue.name.trim() && inputValue.email.trim()) {
      await addUser(inputValue);
      setInputValue(initialState);
      console.log(data);
    } else {
      setCheckErrEmail('Vui long nhap Email!');
      if (!inputValue.name.trim()) {
        setCheckErrName('Vui long nhap Name!');
      }
    }
  };

  const handleEditUser = () => {
    data?.map(async (user) => {
      if (user.id === editFormUser.id) {
        await editUser({
          id: user.id,
          body: inputValue as IUser
        });
      }
      return user;
    });

    setInputValue(initialState);
    setEditFormUser({
      isEdit: true,
      id: 0
    });
  };

  const handleCancel = () => {
    setInputValue(initialState);

    setEditFormUser({
      isEdit: true,
      id: 0
    });
  };

  const handleCheckEditUser = (id: number) => {
    const findUser = data?.find((user) => user.id === id);
    if (findUser) {
      setInputValue({
        name: findUser.name,
        email: findUser.email
      });
    }

    setEditFormUser({
      isEdit: false,
      id
    });
  };

  const handleDeleteUser = async (id: number) => {
    const conf = window.confirm('Are you sure you want to delete?');
    if (conf) {
      await deleteUser({ id });
    }
  };

  return (
    <StyledDashboard>
      <div style={{ display: 'block', padding: 20 }}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={inputValue.name}
            onChange={handleSetInputName}
          />
          <label>{checkErrName}</label>
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={inputValue.email}
            onChange={handleSetInputEmail}
          />
          <label>{checkErrEmail}</label>
        </div>
        {editFormUser.isEdit && <button onClick={handleSubmit}>ADD</button>}
        {!editFormUser.isEdit && (
          <>
            <button onClick={handleEditUser}>EDIT</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
      </div>
      {!isLoading &&
        data?.map((user, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <label>{user.id}</label>
            <label>{user.name}</label>
            <p>{user.email}</p>
            <div>
              <button
                style={{ margin: '0 10px' }}
                onClick={() => handleCheckEditUser(user.id)}
              >
                EDIT
              </button>
              <button onClick={() => handleDeleteUser(user.id)}>DELETE</button>
            </div>
          </div>
        ))}
    </StyledDashboard>
  );
};

export default Dashboard;
