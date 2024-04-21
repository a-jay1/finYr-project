// Library imports
import { Form, Formik } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
// User defined imports
import tmsFunctions from "../../../../../utils/trademarksearch";
import styles from "../../styles.module.scss";

const DesktopSearchForm = (props) => {
  const [options, setOptions] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const inputRef = useRef(null);
  const optionRef = useRef(null);

  // constant variables
  const {
    handleSubmit,
    proceeding,
    RegisterServiceSchema,
    ServiceInitialValues,
    placeholder,
    isPad,
    disableOption = false,
    isMobile,
    onOptionClick,
    searchDashboard,
  } = props;

  const handleFormSubmission = (values, { resetForm }) => {
    handleSubmit(values, resetForm);
  };

  const fetchOptions = useCallback(
    debounce((value) => {
      if (value.length > 2 && !disableOption) {
        tmsFunctions.getTrademarkData(value, 1, "", (tmdata) => {
          if (tmdata.trademark_details.total == 0) {
            searchDashboard(value);
          }
          setOptions(tmdata.trademark_details.hits);
        });
        setShowOption(true);
      } else {
        setOptions([]);
        setShowOption(false);
      }
    }, 750),
    []
  );

  // const fetchOptions = (value) => {

  // };

  useEffect(() => {
    const checkRef = (e) => {
      if (e.target !== optionRef.current && e.target !== inputRef.current) {
        setShowOption(false);
      }
    };
    window.addEventListener("click", checkRef);
    return () => {
      window.removeEventListener("click", checkRef);
    };
  }, []);

  return (
    <Formik
      initialValues={ServiceInitialValues}
      validationSchema={RegisterServiceSchema}
      onSubmit={handleFormSubmission}
    >
      {({ values, errors, touched, setFieldValue, resetForm }) => (
        <div
          className={`${styles.mainForm} ${props?.noMargin && styles.noMargin}`}
        >
          <Form
            id="tm_search_form"
            className={`${!props?.noMargin && "mt-4"} ${styles.formSection} ${
              errors.brandName && touched.brandName ? `${styles.error}` : ""
            }`}
          >
            {!isMobile && (
              <img
                src="https://assets.vakilsearch.com/live-images/trademark-search/glassIcon.svg"
                className={styles.glassIcon}
              />
            )}

            <input
              ref={inputRef}
              type="text"
              className=""
              placeholder={"Search your brand name here"}
              value={values.brandName}
              name="brandName"
              onChange={(e) => {
                setFieldValue("brandName", e.target.value);
                fetchOptions(e.target.value);
              }}
              onFocus={() => setShowOption(true)}
            />
            <button
              type="submit"
              className={styles.actionBtn}
              disabled={proceeding}
            >
              {isPad ? (
                proceeding ? (
                  <div class="spinner-grow text-dark" role="status">
                    <span class="sr-only">Searching...</span>
                  </div>
                ) : (
                  "Search now"
                )
              ) : proceeding ? (
                "Searching..."
              ) : isMobile ? (
                "Search"
              ) : (
                "Search now"
              )}
            </button>
          </Form>
          {options.length > 0 && !disableOption && showOption && (
            <div className={styles.options} ref={optionRef}>
              <p
                className={styles.viewResults}
                onClick={() => handleFormSubmission(values, { resetForm })}
              >
                View all results related to "{values.brandName}"
              </p>
              <ul>
                {options.map((item) => {
                  return (
                    <li
                      key={item._id}
                      className={styles.item}
                      onClick={() =>
                        onOptionClick(item._source.appl_no, values)
                      }
                    >
                      {item._source.trademark_image ? (
                        <img
                          src={item._source.trademark_image}
                          alt="logo"
                          height="70"
                          width="70"
                        />
                      ) : (
                        <img
                          src="https://assets.vakilsearch.com/live-images/trademark-search/emptyLogo.svg"
                          alt="logo"
                          height="70"
                          width="70"
                          className={styles.emptyLogo}
                        />
                      )}

                      <div className={styles.info}>
                        <p>{item._source.word_mark}</p>
                        <ul className={styles.classList}>
                          {item?._source?.wclass?.map((classValue) => (
                            <li
                              key={classValue}
                              className={styles.classItem}
                            >{`Class - ${classValue}`}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {errors.brandName && touched.brandName ? (
            <div
              className={`validation-container validation-error relative mx-auto`}
            >
              {errors.brandName}
            </div>
          ) : null}
        </div>
      )}
    </Formik>
  );
};

export default DesktopSearchForm;
