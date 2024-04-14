import formatDate from "../utils/formatter/datetime";
import { formatCurrency } from "../utils/formatter/currency";

export interface CsvColumn {
  key: string;
  title?: string;
}

export const downloadCsv = ( 
  data: Record<string, any>[], 
  columns: CsvColumn[], 
  filename: string
) => {
  const nullToEmptyReplacer = ( _key: string, value: any ) => {
    return ( null === value ? "" : value );
  };

  const prepareDataItem = ( dataItem: Record<string, any> ) => {
    return columns.map( column => {
      let value = ( dataItem[column.key] ?? "-" );

      if ( column.key in dataItem ) {
        if ( column.key === "totalExpensesPerMonth" ) {
          value = dataItem[column.key].map((item: any) => {
            return `Rp. ${formatCurrency(item.expenses)} - ${formatDate(item.dateTime)}`;
          });
        }
      }

      return JSON.stringify( value, nullToEmptyReplacer );
    });
  };

  const headingsRow = columns.map( column => column.title ).join( "," );
  const contentRows = data.map( dataItem => {
    return prepareDataItem( dataItem ).join( "," );
  });

  const csvDataString = [ headingsRow, ...contentRows ].join( "\r\n" );

  const universalBom = "\uFEFF";
  const blobParts    = [ universalBom + csvDataString ];
  const blobOptions: BlobPropertyBag = {
    type: "text/csv;charset=UTF-8"
  };

  const file = new Blob( blobParts, blobOptions );
  const link = document.createElement( "a" );
  
  link.href     = window.URL.createObjectURL( file );
  link.download = `${filename}.csv`;
  link.click();
};
