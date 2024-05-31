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
import React, { useEffect, useState } from "react";

interface SaleOrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  overlayType: "OverlayOne" | "OverlayTwo" | null;
  formData?: {
    product: string;
    sellingRate: string;
    totalItems: string;
    remainingItems: number;
    sku: string;
    rate: string;
  };
  isReadOnly?: boolean;
}

const SaleOrderFormSchema = Yup.object().shape({
  product: Yup.string().required("Product is required"),
  sellingRate: Yup.number().required("Selling Rate is required"),
  totalItems: Yup.number().required("Total Items is required"),
});

export function SaleOrderForm({
  isOpen,
  onClose,
  overlayType,
  formData,
  isReadOnly,
}: SaleOrderFormProps) {
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
    product: formData?.product || "",
    sellingRate: formData?.sellingRate || "",
    totalItems: formData?.totalItems || "",
    remainingItems: formData?.remainingItems || 0,
    sku: formData?.sku || "",
    rate: formData?.rate || "",
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
            onSubmit={(values, actions) => {
              console.log(values);
              actions.setSubmitting(false);
              onClose();
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
                    <option value="Product 5">Product 5</option>
                    <option value="Stocked Product 1">Stocked Product 1</option>
                    <option value="Benoit Saint Denis">
                      Benoit Saint Denis
                    </option>
                    <option value="Anonymous Product">Anonymous Product</option>
                    <option value="Stocked Tea I">Stocked Tea I</option>
                  </Field>
                  {errors.product && touched.product ? (
                    <Text color="red.500">{errors.product}</Text>
                  ) : null}
                </FormControl>
                <Box mt={4} p={4} borderWidth={1} borderRadius="md">
                  <Text mb={2}>SKU: {initialValues.sku}</Text>
                  <Text mb={2}>Rate: {initialValues.rate}</Text>
                  <FormControl id="selling-rate" mb={2}>
                    <FormLabel>Selling Rate</FormLabel>
                    <Field
                      as={Input}
                      name="sellingRate"
                      placeholder="Enter selling rate"
                      readOnly={isReadOnly}
                    />
                    {errors.sellingRate && touched.sellingRate ? (
                      <Text color="red.500">{errors.sellingRate}</Text>
                    ) : null}
                  </FormControl>
                  <FormControl id="total-items" mb={2}>
                    <FormLabel>Total Items</FormLabel>
                    <Field
                      as={Input}
                      name="totalItems"
                      placeholder="Enter quantity"
                      readOnly={isReadOnly}
                    />
                    {errors.totalItems && touched.totalItems ? (
                      <Text color="red.500">{errors.totalItems}</Text>
                    ) : null}
                  </FormControl>
                  <Text color="green.500">
                    {initialValues.remainingItems} Item(s) Remaining
                  </Text>
                </Box>
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
