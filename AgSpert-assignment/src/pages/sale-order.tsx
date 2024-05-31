import { EmailIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useState, useEffect, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saleOrder as saleOrderApi } from "../redux/features/sale-order/saleOrderApi";
import API_REQUEST_STATUS from "../redux/utils/constants/apiRequestStatus";
import { Icon } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import moment from "moment";
import { ChakraProvider, Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import { SaleOrderForm } from "./sale-order-form";

export const SaleOrder = () => {
  const dispatch: any = useDispatch();
  const saleOrder = useSelector((globalState: any) => globalState.saleOrder);

  let [saleOrders, setSaleOrders]: any = useState([]);
  let [loading, setLoading]: any = useState([]);
  useEffect(() => {
    console.log("use");
    dispatch(saleOrderApi("desc"));
  }, []);

  useEffect(() => {
    if (saleOrder.status == API_REQUEST_STATUS.PENDING) {
      setLoading(true);
    }
    if (saleOrder.status == API_REQUEST_STATUS.SUCCEEDED) {
      setSaleOrders(saleOrder.data);
      console.log(saleOrders);
      console.log("saleOrder.data", saleOrder.data);
      setLoading(false);
    }
    if (saleOrder.status == API_REQUEST_STATUS.FAILED) {
      // code
    }
  }, [saleOrder]);

  const formatDate = (isoString: string) => {
    return moment(isoString).format("DD/MM/YYYY(h:mm A)");
  };

  // icons

  // modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);
  const [formData, setFormData] = useState<any>(null);

  const handleOpenModal = (
    overlayType: "OverlayOne" | "OverlayTwo",
    data?: any
  ) => {
    setOverlay(overlayType as any);
    setFormData(data || null);
    onOpen();
  };

  const sampleData = {
    product: "Product 5",
    sellingRate: "100",
    totalItems: "10",
    remainingItems: 50,
    sku: "227",
    rate: "324",
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
                    onClick={() => handleOpenModal("OverlayOne")}
                  >
                    Sale Order
                  </Button>
                </Stack>
              </div>
            </div>
          </TabList>
          <TabPanels>
            {/* initially mounted */}
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
                    ) : saleOrders.results && saleOrders.results.length > 0 ? (
                      saleOrders.results.map((s: any) => (
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
                              {s.customer.customer_profile.name}
                            </span>
                            <div className="tag mx-2">
                              {s.customer.customer_profile.tag}
                            </div>
                          </Td>
                          <Td>{s.product.price}</Td>
                          <Td>{formatDate(s.product.updated_on)}</Td>
                          <Td
                            onClick={() =>
                              handleOpenModal("OverlayOne", sampleData)
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
            {/* initially not mounted */}
            <TabPanel>
              <p>two!</p>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>multiply by</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <SaleOrderForm
        isOpen={isOpen}
        onClose={onClose}
        overlayType={overlay}
        formData={formData}
      />
    </div>
  );
};
