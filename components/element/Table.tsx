import formatDate from "../../utils/formatter/datetime";
import { formatCurrency } from "../../utils/formatter/currency";
import { TExpenses } from '../../service/type';
import Action from './Action';

interface TableProps {
  expensesData: TExpenses[];
  toggleDropdown: any;
  handleDelete: any;
  openDropdownId: number | null;
}

const Table: React.FC<TableProps> = ({ expensesData, toggleDropdown, handleDelete, openDropdownId }) => {
  return (
    <div className="overflow-x-auto py-6 md:py-10">
      <table className="table-auto min-w-full divide-y divide-gray-200">
        <thead className="hidden sm:contents">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
            >
              Category Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
            >
              Expenses
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#FEFDF8] divide-y divide-gray-200 rounded-t-lg">
          {expensesData && expensesData.length > 0 ? (
            <>
              {expensesData.map((item: any, index: number) => (
                <tr key={`expenses-${index}`}>
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-2 md:ml-4">
                        <div className="text-sm md:text-xs font-semibold md:font-normal text-[#191D23]">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {item.totalExpensesPerMonth.map((i: any) => {
                        return (
                          <div className="ml-4" key={i.id}>
                            <div className="text-xs font-normal text-[#191D23]">
                              Rp. {formatCurrency(i.expenses)}
                            </div>
                            <div className="text-xs font-normal text-[#191D23]">
                              {formatDate(i.dateTime)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-4 whitespace-nowrap text-sm font-normal items-center justify-end relative">
                    <Action
                      toggleDropdown={() => toggleDropdown(item.id)}
                      id={item.id}
                      openDropdownId={openDropdownId}
                      handleDelete={(e: any) => handleDelete(e, item.name, item.id)}
                    />
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td colSpan={5} className="p-10 text-[#00371D]">
                <div className="flex justify-center items-center font-medium">
                  <div className="block text-center">
                    <img src="/images/search-icon.svg" alt="search-icon" className="m-auto" />
                    <div className="text-xl py-2">No Data Founded</div>
                    <div className="text-sm">
                      Please Connect OpenApi Local for Show the Data
                    </div>
                  </div>
                </div>
              </td>
            </tr> 
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
