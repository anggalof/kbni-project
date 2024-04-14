import React, { useState } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Chart from '../../components/common/Chart';
import Table from '../../components/element/Table';
import Button from '../../components/element/Button';
import withAuth from '../../utils/auth';
import { mockData } from '../../service/mockData';
import { TExpenses } from '../../service/type';
import { downloadCsv, CsvColumn } from "../../library/csv";

const columns: CsvColumn[] = [
  {
    key: "label",
    title: "Category Name"
  },
  {
    key: "totalExpensesPerMonth",
    title: "Expenses"
  },
];

const Dashboard: React.FC<{ expensesData: TExpenses[] }> = ({ expensesData }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [ isProcessing, setIsProcessing ] = useState( false );

  const toggleDropdown = (id: any) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, name: string, id: any) => {
    e.preventDefault();
  };
  
  const onClickDownload = async () => {
    setIsProcessing( true );

    const data = expensesData;

    await new Promise( resolve => setTimeout( resolve, 3000 ) );

    downloadCsv( data, columns, "Download Expenses Data" );

    setIsProcessing( false );
  };

  return (
    <div className="container mx-auto px-4">
      <Chart expensesData={expensesData} />

      <div className="flex justify-between mt-16">
        <div className="text-xl px-6 text-[#111110] flex items-center">Data List</div>
        <Link href="/dashboard/add" className="mr-6">
          <div className="hidden sm:block">
            <Button title="Add Data" />
          </div>
          <div className="md:hidden">
            <img src="/images/icons/icon-add.svg" alt="icon-add" className="w-[2rem]" />
          </div>
        </Link>
      </div>

      <Table
        expensesData={expensesData}
        toggleDropdown={toggleDropdown}
        handleDelete={handleDelete}
        openDropdownId={openDropdownId} />

      <div onClick={onClickDownload} className="mb-20">
        <Button title={isProcessing ? 'Please wait...' : 'Download CSV'} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const expensesData: TExpenses[] = mockData;
  return {
    props: {
      expensesData,
    },
  };
};

export default withAuth(Dashboard);
