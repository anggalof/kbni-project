import { useState, useEffect } from "react";
import { NextPageContext } from "next";
import Router, { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mockData } from "../../service/mockData";
import Button from "../../components/element/Button";
import Modal from "../../components/element/Modal";
import ToastNotification from "../../components/element/ToastNotification";
import formatDate from "../../utils/formatter/datetime";
import styles from "./style.module.css";
import CustomInput from "../../components/element/Calendar";
import { TExpenses } from '../../service/type';
import withAuth from "../../utils/auth";

type Props = {
  dataList: TExpenses
}

export function Dashboards (props: Props) {
  const { dataList } = props;
  const router = useRouter();
  let paramArray = router.query.param as string[] | undefined;
  let value = '';
  if (Array.isArray(paramArray) && paramArray.length > 1) {
    value = paramArray[1];
  }
  const id = value;
  const subpage = router.asPath.split('/')[2]
  const currentSubPage = subpage.charAt(0).toUpperCase() + subpage.slice(1).toLowerCase();

  const [formData, setFormData] = useState<{ 
    label: string, totalExpensesPerMonth: any
  }>({ label: '', totalExpensesPerMonth: [{ id: 0, expenses: 0, dateTime: '' }]   });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [disabled, setDisable] = useState(false);

  const [err, setErr] = useState<{ name: boolean }>({ name: false });

  useEffect(() => {
    if (dataList) {
      setFormData({
        label: dataList.label,
        totalExpensesPerMonth: dataList.totalExpensesPerMonth.map((item: any) => {
          return {
            id: item.id,
            expenses: item.expenses,
            dateTime: item.dateTime
          }
        })
      });
    }
    if (currentSubPage === 'View') {
      setDisable(true);
    }
  }, [dataList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | Date, inputType: string) => {
    if (typeof e === 'string' || e instanceof Date) {
      let date: string | Date | null = null;
      if (e instanceof Date) {
        date = new Date(e as unknown as string).toISOString().slice(0, 10);
      }
      setFormData(prevState => ({
        ...prevState,
        label: typeof e === 'string' && inputType === 'label' ? e : prevState.label,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async () => {
    let textInfo = "";
    let textDesc = "";
    if (currentSubPage === 'Add') {
      textInfo = "Data Added Successfully";
      textDesc = "You have successfully added";
    } else {
      textInfo = "Edit Data Successfully";
      textDesc = "The data has been successfully Editted from the system";
    }

    
    toast.success(
      <ToastNotification
        textInfo={textInfo}
        textDesc={textDesc}
        iconBgColor="bg-[#2A5707]"
        iconColor="text-[#E7F6DB]"
      />, {
      icon: <></>,
      style: { background: '#E7F6DB', color: '#2A5707' },
      hideProgressBar: true,
      autoClose: 3000,
    });

    setTimeout(() => {
      Router.push('/');
    }, 3000);

    handleCloseModal();
  };

  const toDay = new Date();
  const filterPastDates = (date: { getTime: () => number; }) => {
    return date.getTime() <= toDay.getTime();
  };

  const addDescription = 'Please make sure there are no mistakes and typos when filling the information.';
  const editDescription = 'Please make sure there are no mistakes and typos when editting the information.';

  return (
    <div className={styles.root}>
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex px-6 pt-6 pb-2">
          <div className="cursor-pointer flex items-center text-xl px-1 py-1 text-black w-8" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="text-xl px-3 md:px-4 text-[#111110] flex items-center">{currentSubPage} Data</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto w-[auto] lg:w-[60%] py-6 px-4 rounded-xl bg-[#FEFDF8] text-black font-medium mt-0 mb-6 mx-6 md:m-6">
            <div className="text-sm mx-2">Category</div>
            <div className="m-2">
              <input
                type="text"
                name="label"
                onChange={(e: any) => handleInputChange(e.target.value, e.target.name)}
                value={formData.label}
                placeholder="Enter Category"
                disabled={disabled}
                className={`
                  w-[100%] border border-solid border-1 rounded-lg p-2 text-xs border-[#E6E6E6]
                `} />
            </div>

            <div className="my-4 mx-2 flex cursor-pointer">
              <img src="/images/icons/icon-add.svg" alt="icon-add" className="w-4" />
              <span className="ml-2 text-sm">Add Expenses</span>
            </div>
            {formData.totalExpensesPerMonth.map((data: any) => {
              return (
                <div key={data.id} className="flex">
                  <div>
                  <div className="text-sm mx-2">Expenses</div>
                    <div className="m-2">
                      <input
                        type="text"
                        name="expenses"
                        onChange={(e: any) => handleInputChange(e.target.value, e.target.name)}
                        value={data.expenses}
                        placeholder="Enter ID Card Number"
                        disabled={disabled}
                        className={`
                          w-[100%] border border-solid border-1 rounded-lg p-2 text-xs border-[#E6E6E6]
                        `} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm mx-2">Date</div>
                    <div className="m-2">
                      <DatePicker
                        selected={data.dateTime ? new Date(data.dateTime) : null}
                        onChange={(date: any) => handleInputChange(date, 'dateTime')}
                        customInput={
                          <CustomInput
                            name="dateTime"
                            onChange={(date: any) => handleInputChange(date, 'dateTime')}
                            value={formatDate(data.dateTime)}
                            className={`
                              w-[100%] border border-solid border-1 rounded-lg p-2 text-xs border-[#E6E6E6]
                            `}
                            disabled={disabled} />
                        }
                        value={data.dateTime ? formatDate(data.dateTime) : undefined}
                        maxDate={toDay}
                        filterDate={filterPastDates}
                        placeholderText="Choose Date"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={1000}
                        disabled={disabled}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="hidden md:block">
              {currentSubPage !== 'View' && (
                <div className="flex items-end justify-end py-4 mr-2 mt-6 border-t border-[#E6E6E6]">
                  <Button title={`${currentSubPage} Data`} type="submit" />
                </div>
              )}
            </div>
          </div>
          <div className="block md:hidden">
            {currentSubPage !== 'View' && (
              <div className="fixed bottom-0 w-full flex justify-center p-4 border-t-2 border-[#D3D6C4]">
                <Button title={`${currentSubPage === 'Add' ? 'Add Data' : 'Save Edit'}`} type="submit" mob={true} />
              </div>
            )}
          </div>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          header={`${currentSubPage} Data`}
          description={`${currentSubPage === 'Add' ?
            addDescription : editDescription}`}
          onConfirm={handleConfirm}
          confirmTitle={`${currentSubPage === 'Add' ?
            'Yes, Add' : 'Yes, Edit'}`}
          bgDelete={false} />
      </div>
    </div>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  let dataList: TExpenses = {
    id: 0,
    label: '',
    totalExpensesPerMonth: []
  }

  let section = context.query.param?.toString().split(',')[0];

  const isEdit = section === 'edit' || section === 'view';
  if (isEdit) {
    const id: any = context.query.param?.toString().split(',')[1] as string
    let result = null;
    await mockData.map((item: any) => {
      if (item.id === parseInt(id)) {
        result = item;
      }
    });
    if (result) {
      dataList = result;
    }
  }

  return {
    props: {
      dataList,
    },
  }
}

export default withAuth(Dashboards)
