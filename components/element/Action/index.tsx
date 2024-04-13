import React from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.css";

interface ActionProps {
  toggleDropdown: any;
  id: any;
  openDropdownId: number | null;
  handleDelete: any;
}

const Action: React.FC<ActionProps> = ({ toggleDropdown, id, openDropdownId, handleDelete }) => {
  return (
    <React.Fragment>
      <button
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="7" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="17" r="2" />
        </svg>
      </button>
      {openDropdownId === id && (
        <div className={`absolute w-28 top-2 bg-[#FEFDF8] rounded-md shadow-lg z-[99999] ${styles.action}`}>
          <div
            className="py-1 divide-y divide-gray-200"
          >
            <Link
              href={`/dashboard/view/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              View
            </Link>
            <Link
              href={`/dashboard/edit/${id}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </Link>
            <Link
              href="/"
              onClick={handleDelete}
              className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete
            </Link>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Action;
