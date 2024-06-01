import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSaleOrder,
  editSaleOrder,
  getProducts,
} from "../redux/features/sale-order/saleOrderApi";
import API_REQUEST_STATUS from "../redux/utils/constants/apiRequestStatus";

interface SaleOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  overlayType: "OverlayOne" | "OverlayTwo" | null;
  formData?: {
    id: any;
    product: any;
    sellingRate: string;
    totalItems: string;
    remainingItems: number;
    sku: Array<{
      id: number;
      selling_price: number;
      max_retail_price: number;
      amount: number;
      unit: string;
      quantity_in_inventory: number;
      product: number;
    }>;
    rate: string;
  };
  isReadOnly?: boolean;
}
const SaleOrderFormSchema = Yup.object().shape({
  product: Yup.string().required("Product is required"),
  sku: Yup.array().of(
    Yup.object().shape({
      selling_price: Yup.number().required("Selling Price is required"),
      amount: Yup.number().required("Amount is required"),
    })
  ),
});

export function SaleOrderForm({
  isOpen,
  onClose,
  overlayType,
  formData,
  isReadOnly,
}: SaleOrderFormProps) {
  const dispatch: any = useDispatch();
  const product = useSelector((globalState: any) => globalState.product);

  let [productList, setProductList]: any = useState([]);
  useEffect(() => {
    dispatch(getProducts("desc"));
  }, []);

  useEffect(() => {
    if (product.status == API_REQUEST_STATUS.PENDING) {
    }
    if (product.status == API_REQUEST_STATUS.SUCCEEDED) {
      setProductList(product.data.results);
    }
    if (product.status == API_REQUEST_STATUS.FAILED) {
      // code
    }
  }, [product]);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const getOverlay = () => {
    switch (overlayType) {
      case "OverlayOne":
        return <OverlayOne />;
      case "OverlayTwo":
        return <OverlayTwo />;
      default:
        return null;
    }
  };

  const initialValues = {
    product: formData?.product?.id || "",
    sku:
      formData?.product?.sku?.map((item: any) => ({
        id: item.id || "",
        selling_price: item.selling_price || "",
        amount: item.amount || "",
      })) || [],
  };
  const handleAddSaleOrder = (values: any) => {
    dispatch(addSaleOrder(values));
  };

  const handleEditSaleOrder = (values: any) => {
    dispatch(editSaleOrder(values));
  };

  const handleSubmit = (submitValues: any, actions: any) => {
    let values = {
      product: {
        id: submitValues.product,
        sku: submitValues.sku,
      },
    };
    if (formData) {
      handleEditSaleOrder({ id: formData.id, ...values });
    } else {
      handleAddSaleOrder({
        ...values,
        product: {
          id: values.product.id,
          sku: [
            {
              id: new Date().getTime(),
              selling_price: 0,
              max_retail_price: 0,
              amount: 0,
              unit: "kg",
              quantity_in_inventory: 79,
              product: 209,
            },
          ],
        },
      });
    }
    actions.setSubmitting(false);
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      {getOverlay()}
      <ModalContent>
        <ModalHeader>Sale Order Form</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            validationSchema={SaleOrderFormSchema}
            onSubmit={(values: any, actions: any) => {
              console.log({ values });
              handleSubmit(values, actions);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <FormControl id="all-products" isRequired>
                  <FormLabel>All Products</FormLabel>
                  <Field
                    as={Select}
                    name="product"
                    placeholder="Select a product"
                    isReadOnly={isReadOnly}
                  >
                    {productList && productList.length > 0 ? (
                      productList.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))
                    ) : (
                      <option value="Loading">Loading</option>
                    )}
                  </Field>
                  {errors.product && touched.product ? (
                    <Text color="red.500">{errors.product as any}</Text>
                  ) : null}
                </FormControl>
                {formData?.product?.sku.map((skuItem: any, i: number) => (
                  <Box
                    key={skuItem.id}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    mb={4}
                  >
                    <div className="d-flex jcsb ">
                      <Text mb={2}>
                        {i + 1} SKU: {skuItem.id} ( {skuItem.amount}{" "}
                        {skuItem.unit})
                      </Text>
                      <Text mb={2}>Rate: &#8377; {skuItem.selling_price}</Text>
                    </div>

                    <FormControl id={`selling-rate-${i}`} mb={2}>
                      <FormLabel>Selling Rate</FormLabel>
                      <Field
                        as={Input}
                        name={`sku[${i}].selling_price`}
                        placeholder="Enter selling rate"
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <FormControl id={`total-items-${i}`} mb={2}>
                      <FormLabel>Total Items</FormLabel>
                      <Field
                        as={Input}
                        name={`sku[${i}].quantity_in_inventory`}
                        placeholder="Enter quantity"
                        readOnly={isReadOnly}
                      />
                    </FormControl>
                    <Text color="green.500">
                      {skuItem.quantity_in_inventory} Item(s) Remaining
                    </Text>
                  </Box>
                ))}
                {/* </Box>
                )} */}
                <ModalFooter>
                  <Button onClick={onClose} mr={3} disabled={isSubmitting}>
                    Close
                  </Button>
                  {!isReadOnly && (
                    <Button
                      colorScheme="blue"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Submit
                    </Button>
                  )}
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
