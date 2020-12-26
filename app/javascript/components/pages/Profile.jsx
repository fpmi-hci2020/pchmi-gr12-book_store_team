import React, { useState } from "react";
import Header from "../common/Header";
import Menu from "../common/Menu";
import Input from "../common/Input";
import Button from "../common/Button";

import img from "images/img.jpg";

const UpdateForm = ({ values, onChangeHendlers, onClick }) => {
  console.log(values.email);
  return (
    <div className="user-info__text-info update_profile">
      <div className="update_profile__fio">
        <Input
          value={values.fio}
          type={"profile_fio"}
          onChange={onChangeHendlers.fio}
          withoutLabel
        />
        <Button text={"Submit"} type={"button"} onClick={onClick} />
      </div>
      <div className="user-info__text-info__delivery-info">
        <Input
          value={values.email}
          onChange={onChangeHendlers.email}
          type={"profile"}
        />
        <Input
          value={values.phone}
          onChange={onChangeHendlers.phone}
          type={"profile"}
        />
        <Input
          value={values.adress}
          onChange={onChangeHendlers.adress}
          type={"profile"}
        />
        <Input
          value={values.DofB}
          onChange={onChangeHendlers.DofB}
          type={"profile"}
        />
        <Input
          value={values.gender}
          onChange={onChangeHendlers.gender}
          type={"profile"}
        />
      </div>
    </div>
  );
};

const Profile = (props) => {
  const [updateProfile, setUpdateProfile] = useState(false);
  const [FIO, setFIO] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [adress, setAdress] = useState();
  const [birthDate, setbirthDate] = useState();
  const [gender, setGender] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/v1/users/${props.currentUserId}`);
      if (response.status === 200) {
        const data = await response.json();
        setFIO(data.name);
        setEmail(data.email);
        setAdress(data.address);
        setPhone(data.phone_number);
        setbirthDate(data.birthdate);
        setGender(data.genre);
        setImage(data.avatar_url);
        console.log("User: ", data);
      } else {
        console.log("Data loading error");
      }
    };
    fetchData();
  }, []);

  const editProfile = () => {
    setUpdateProfile(true);
  };

  const onUpdateProfile = async () => {
    const user = {
      email: email,
      address: adress,
      name: FIO,
      avatar_url: null,
    };

    const response = await fetch(`/api/v1/users/${props.currentUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user,
      }),
    });
    if (response.status === 200) {
      console.log("OK");
      setUpdateProfile(false);
    } else if (response.status === 400) {
      console.log("Can not update user");
    }
  };

  const FIOChangeHandler = (e) => {
    setFIO(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const phoneChangeHandler = (e) => {
    setPhone(e.target.value);
  };

  const adressChangeHandler = (e) => {
    setAdress(e.target.value);
  };

  const birthDateChangeHandler = (e) => {
    setbirthDate(e.target.value);
  };

  const genderChangeHandler = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="profile_content">
        <Menu />
        <div className="content">
          <div className="user-info__container">
            <div className="user-info__image">
              <img
                alt="Book"
                src={image ? image : img}
                width="100%"
                height="100%"
              />
            </div>

            {!updateProfile ? (
              <div className="user-info__text-info">
                <div className="update_profile__fio">
                  <h3 className="user-info__text-info__fio">{FIO}</h3>
                  <Button text={"Edit"} type={"button"} onClick={editProfile} />
                </div>
                <div className="user-info__text-info__delivery-info">
                  <div className="user-info__text-info__delivery-info__content">
                    <p>Email:</p>
                    <p>{email}</p>
                  </div>
                  <div className="user-info__text-info__delivery-info__content">
                    <p>Номер телефона:</p>
                    <p>{phone}</p>
                  </div>
                  <div className="user-info__text-info__delivery-info__content">
                    <p>Адрес доставки:</p>
                    <p>{adress}</p>
                  </div>
                  <div className="user-info__text-info__delivery-info__content">
                    <p>Дата рождения:</p>
                    <p>{birthDate}</p>
                  </div>
                  <div className="user-info__text-info__delivery-info__content">
                    <p>Пол:</p>
                    <p>{gender}</p>
                  </div>
                </div>
              </div>
            ) : (
              <UpdateForm
                values={{
                  fio: FIO,
                  email: email,
                  phone: phone,
                  adress: adress,
                  DofB: birthDate,
                  gender: gender,
                }}
                onChangeHendlers={{
                  fio: (e) => FIOChangeHandler(e),
                  email: (e) => emailChangeHandler(e),
                  phone: (e) => phoneChangeHandler(e),
                  adress: (e) => adressChangeHandler(e),
                  DofB: (e) => birthDateChangeHandler(e),
                  gender: (e) => genderChangeHandler(e),
                }}
                onClick={onUpdateProfile}
              />
            )}
          </div>
          <div className="navigation">
            <a href="/favorites" className="navigation__card">
              <p>Избранное</p>
            </a>
            <a href="/orders" className="navigation__card">
              <p>Купленные книги</p>
            </a>
            <a href="/rents" className="navigation__card">
              <p>Арендованные книги</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
