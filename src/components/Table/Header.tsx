import { Th } from "@chakra-ui/react";
import { Header, flexRender } from "@tanstack/react-table";
import { InputDataTypes } from "../Table";

function TableHeader<TData extends InputDataTypes>(
  header: Header<TData, unknown>
) {
  return (
    <Th key={header.id}>
      {header.isPlaceholder ? null : (
        <button
          style={
            header.column.getCanSort()
              ? { cursor: "pointer", userSelect: "none" }
              : {}
          }
          onClick={header.column.getToggleSortingHandler()}
          onKeyDown={header.column.getToggleSortingHandler()}
          tabIndex={0}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
          {{
            asc: " 🔼",
            desc: " 🔽",
          }[header.column.getIsSorted() as string] ?? null}
        </button>
      )}
    </Th>
  );
}

export default TableHeader;
