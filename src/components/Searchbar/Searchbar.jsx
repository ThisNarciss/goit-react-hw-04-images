import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';
import * as Yup from 'yup';
import {
  SearchBarBox,
  Form,
  Field,
  FormBtn,
  BtnLabel,
  ErrorMessage,
} from './Searchbar.styled';

const schema = Yup.object().shape({
  search: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
});

const initialValue = {
  search: '',
};

export function Searchbar({ onSubmit }) {
  const handleFormSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <SearchBarBox>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <FormBtn type="submit">
            <FcSearch size={30} />
            <BtnLabel>Search</BtnLabel>
          </FormBtn>

          <Field
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="search" component="p" />
        </Form>
      </Formik>
    </SearchBarBox>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
