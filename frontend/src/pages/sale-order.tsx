import { AddIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Icon,
  Button,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSaleOrder as saleOrderApi } from "../redux/features/sale-order/saleOrderApi";
import API_REQUEST_STATUS from "../redux/utils/constants/apiRequestStatus";
import moment from "moment";
import { SaleOrderForm } from "./sale-order-form";

export const SaleOrder = () => {
  const dispatch: any = useDispatch();
  let [loading, setLoading]: any = useState([]);
  let [saleOrders, setSaleOrders]: any = useState([]);
  let [isReadOnly, setIsReadOnly]: any = useState([]);
  const saleOrder = useSelector((globalState: any) => globalState.saleOrder);

  useEffect(() => {
    dispatch(saleOrderApi("desc"));
  }, []);

  useEffect(() => {
    if (saleOrder.status == API_REQUEST_STATUS.PENDING) {
      setLoading(true);
    }
    if (saleOrder.status == API_REQUEST_STATUS.SUCCEEDED) {
      setSaleOrders(saleOrder.data.results);
      // console.log("(saleOrder.data=>", saleOrder.data);
      setLoading(false);
    }
    if (saleOrder.status == API_REQUEST_STATUS.FAILED) {
      // code
    }
  }, [saleOrder]);

  const formatDate = (isoString: string) => {
    return moment(isoString).format("DD/MM/YYYY(h:mm A)");
  };

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);
  const [formData, setFormData] = useState<any>(null);
  const handleOpenModal = (
    overlayType: "OverlayOne" | "OverlayTwo",
    data?: any,
    isReadOnly?: boolean
  ) => {
    setOverlay(overlayType as any);
    setFormData(data || null);
    setIsReadOnly(isReadOnly);
    onOpen();
  };

  return (
    <div className="form-container">
      <div className="box ">
        <Tabs isLazy>
          <TabList>
            <div className="tab-con">
              <div className="d-flex">
                <Tab>Active Sale Orders</Tab>
                <Tab>Completed Sale Orders</Tab>
              </div>
              <div>
                <Stack direction="row" spacing={4}>
                  <Button
                    leftIcon={<AddIcon />}
                    colorScheme="teal"
                    variant="solid"
                    onClick={() =>
                      handleOpenModal("OverlayOne", undefined, false)
                    }
                  >
                    Sale Order
                  </Button>
                </Stack>
              </div>
            </div>
          </TabList>
          <TabPanels>
            {/* Active Sale Orders start */}
            <TabPanel>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Customer Name</Th>
                      <Th>Price ( &#8377; )</Th>
                      <Th>Last Modified</Th>
                      <Th>Edit/View</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {loading ? (
                      <Tr>
                        <Td>Loading ...</Td>
                      </Tr>
                    ) : saleOrders && saleOrders?.length > 0 ? (
                      saleOrders?.map((s: any) => (
                        <Tr key={s.id}>
                          <Td>{s.id}</Td>
                          <Td className="d-flex align-items-center">
                            <Box p={5}>
                              <span className="avator">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-user"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                              </span>
                            </Box>
                            <span className="mx-2">
                              {s.customer?.customer_profile?.name}
                            </span>
                            <div className="tag mx-2">
                              {s.customer?.customer_profile?.tag}
                            </div>
                          </Td>
                          <Td>{s.product?.price}</Td>
                          <Td>{formatDate(s.product?.updated_on)}</Td>
                          <Td
                            onClick={() =>
                              handleOpenModal("OverlayOne", s, false)
                            }
                            className="cursor-pointer"
                          >
                            <Icon viewBox="0 0 200 200" color="gray.500">
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                            <Icon viewBox="0 0 200 200" color="gray.500">
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                            <Icon viewBox="0 0 200 200" color="gray.500">
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={3}>No orders found</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            {/* Active Sale Orders end */}

            {/* Completed Sale Orders start */}
            <TabPanel>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Customer Name</Th>
                      <Th>Price ( &#8377; )</Th>
                      <Th>Last Modified</Th>
                      <Th>Edit/View</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {loading ? (
                      <Tr>
                        <Td>Loading ...</Td>
                      </Tr>
                    ) : saleOrders && saleOrders?.length > 0 ? (
                      saleOrders?.map((s: any) => (
                        <Tr key={s.id}>
                          <Td>{s.id}</Td>
                          <Td className="d-flex align-items-center">
                            <Box p={5}>
                              <span className="avator">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="10"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="feather feather-user"
                                >
                                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                              </span>
                            </Box>
                            <span className="mx-2">
                              {s.customer?.customer_profile?.name}
                            </span>
                            <div className="tag mx-2">
                              {s.customer?.customer_profile?.tag}
                            </div>
                          </Td>
                          <Td>{s.product?.price}</Td>
                          <Td>{formatDate(s.product?.updated_on)}</Td>
                          <Td
                            onClick={() =>
                              handleOpenModal("OverlayOne", s, true)
                            }
                          >
                            <Icon viewBox="0 0 200 200" color="gray.500">
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                            <Icon viewBox="0 0 200 200" color="gray.500">
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                            <Icon viewBox="0 0 200 200" color="gray.500">
                              <path
                                fill="currentColor"
                                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                              />
                            </Icon>
                          </Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={3}>No orders found</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </TabPanel>
            {/* Completed Sale Orders end */}
          </TabPanels>
        </Tabs>
      </div>
      <SaleOrderForm
        isOpen={isOpen}
        onClose={() => {
          onClose();
          dispatch(saleOrderApi("desc"));
        }}
        overlayType={overlay}
        formData={formData}
        isReadOnly={isReadOnly}
      />
    </div>
  );
};
