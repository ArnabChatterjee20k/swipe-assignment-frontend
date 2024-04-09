import { useSelector } from "react-redux";
import { selectGroup } from "./groupSlice";
export const useGroup = () => {
  const group = useSelector(selectGroup);
  const groupSize = group.length;
  const getGroupsByIvoiceID = (id) => {
    return Object.keys(group[parseInt(id)] || {});
  };
  const getItemsMappedToGroups = (id) => {
    const requiredInvoice = group[parseInt(id)];
    if (!requiredInvoice) return {};

    return Object.entries(requiredInvoice).reduce(
      (result, [groupName, products]) => {
        for (const [_, ids] of Object.entries(products)) {
          result[ids] = groupName;
        }
        return result;
      },
      {}
    );
  };

  const getGroupWithProductIdsByInvoiceID = (id) => {
    return group[parseInt(id)] || {};
  };

  return { getGroupsByIvoiceID, groupSize, getItemsMappedToGroups,getGroupWithProductIdsByInvoiceID };
};
