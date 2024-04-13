import React, { useState } from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Chart from '../../components/common/Chart';
import Table from '../../components/element/Table';
import Button from '../../components/element/Button';
import withAuth from '../../utils/auth';
import { mockData } from '../../service/mockData';
import { TExpenses } from '../../service/type';

const Dashboard: React.FC<{ expensesData: TExpenses[] }> = ({ expensesData }) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)

  const toggleDropdown = (id: any) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, name: string, id: any) => {
    e.preventDefault();
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
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Ambil data pengeluaran dari API atau database
  const expensesData: TExpenses[] = mockData;

  return {
    props: {
      expensesData,
    },
  };
};

export default withAuth(Dashboard);
