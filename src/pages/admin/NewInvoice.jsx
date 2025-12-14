import { EyeClosed, Folder, Send, MoveRight } from "lucide-react";
import Logo from "../../assets/images/logo.png";
import React, { useState, useEffect,useRef } from "react";
import { base_url } from "../../services/config";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useDataContext } from "../../context/DataContext";
import SaveAsModal from "../../components/common/SaveAsModal";
import ShareQuotationModal from "../../components/common/ShareQuotationModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
 import { useParams } from "react-router-dom";

const NewInvoice = () => {
  const [tabState, settabState] = useState("Customer Details");
  const { getUserDetails } = useAuthContext();
  const [showPreview, setShowPreview] = useState(true);
   const invoiceRef = useRef(null);
     const { invoiceId } = useParams();

  const [generatedId, setGeneratedId] = useState("");


     // MAIN save handler
  const handleSaveFile = async ({ fileName, fileType }) => {
    const node = invoiceRef.current;

    if (!node) {
      alert("Invoice div not found!");
      return;
    }

    if (fileType === "png") {
      const dataUrl = await htmlToImage.toPng(node);
      downloadFile(dataUrl, fileName + ".png");
    }

    if (fileType === "jpg") {
      const dataUrl = await htmlToImage.toJpeg(node, { quality: 1 });
      downloadFile(dataUrl, fileName + ".jpg");
    }

    if (fileType === "pdf") {
  const dataUrl = await htmlToImage.toPng(node, { cacheBust: true });

  const pdf = new jsPDF("p", "mm", "a4");
  const imgProps = pdf.getImageProperties(dataUrl);

  const pageWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

  pdf.addImage(dataUrl, "PNG", 0, 0, pageWidth, imgHeight);
  pdf.save(fileName + ".pdf");
}

  };

  // UTIL: Force download
  const downloadFile = (dataUrl, fileName) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = fileName;
    link.click();
  };

 

  useEffect(() => {
    // if invoiceId is already present in URL, use it
    if (invoiceId) {
      setGeneratedId(invoiceId);
      localStorage.setItem("currentInvoiceId", invoiceId);
      return;
    }

    // else create new ID
    const saved = localStorage.getItem("currentInvoiceId");
    if (saved) {
      setGeneratedId(saved);
    } else {
      const newId = "INV-" + Math.floor(10000 + Math.random() * 90000);
      setGeneratedId(newId);
      localStorage.setItem("currentInvoiceId", newId);
    }
  }, []);


  // Customer Details State
  const [customerForm, setCustomerForm] = useState({
    customerName: "",
    companyName: "",
    deliveryAddress: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    phone: "",
    specialInstruction: "",
  });

  // Product Details State
  const [productForm, setProductForm] = useState({
    productName: "",
    category: "",
    unitMeasure: "",
    quantity: "",
    city: "",
    phone: "",
    unitPrice: "",
    discount: "",
    tax: "",
  });

  // Product List State
  const [products, setProducts] = useState([]);

  // Price Summary State - Now calculated automatically
  const [priceSummary, setPriceSummary] = useState({
    subTotal: "0.00",
    totalDiscount: "0.00",
    totalTax: "0.00",
    grandTotal: "0.00",
  });
  const [saveModal, setSaveModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);

  const { dataLoad } = useDataContext();

  // Handle Customer Form Changes
  const handleCustomerChange = (field, value) => {
    setCustomerForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Product Form Changes
  const handleProductChange = (field, value) => {
    setProductForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate Price Summary automatically
  useEffect(() => {
    calculatePriceSummary();
  }, [products]);

  const calculatePriceSummary = () => {
    let subTotal = 0;
    let totalDiscount = 0;
    let totalTax = 0;

    products.forEach((product) => {
      const quantity = parseFloat(product.quantity) || 0;
      const unitPrice = parseFloat(product.unitPrice) || 0;
      const discountPercent = parseFloat(product.discount) || 0;
      const taxPercent = parseFloat(product.tax) || 0;

      const productTotal = quantity * unitPrice;
      const productDiscount = (productTotal * discountPercent) / 100;
      const productTax = (productTotal * taxPercent) / 100;

      subTotal += productTotal;
      totalDiscount += productDiscount;
      totalTax += productTax;
    });

    const grandTotal = subTotal - totalDiscount + totalTax;

    setPriceSummary({
      subTotal: subTotal.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
      totalTax: totalTax.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    });
  };

  // Add New Product
  const handleAddProduct = () => {
    if (
      productForm.productName &&
      productForm.quantity &&
      productForm.unitPrice
    ) {
      const newProduct = {
        id: Date.now(),
        ...productForm,
      };
      setProducts((prev) => [...prev, newProduct]);

      // Reset product form
      setProductForm({
        productName: "",
        category: "",
        unitMeasure: "",
        quantity: "",
        city: "",
        phone: "",
        unitPrice: "",
        discount: "",
        tax: "",
      });
    }
  };

  const handleSubmit = async () => {
    const user = getUserDetails();
    if (!user) return alert("User not found");

    try {
      const url = `${base_url}/quotation/create`;
      const res = await axios.post(url, {
        customerDetails: customerForm,
        products: products.length > 0 ? products : [productForm],
        totalAmount: priceSummary.grandTotal,
        companyId: user.companyId,
      });

      toast.success("Quotation Created Successfully!");

      dataLoad();
    } catch (error) {
      console.error(error);
      alert("Error creating quotation");
    }
  };

  // Toggle Preview Visibility
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Calculate next tab
  const getNextTab = () => {
    const tabs = ["Customer Details", "Add Product", "Price Summary"];
    const currentIndex = tabs.indexOf(tabState);
    return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1] : tabState;
  };

  // Handle Next Button
  const handleNext = () => {
    const nextTab = getNextTab();
    settabState(nextTab);
  };

  // Remove product from list
  const removeProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <>
      <SaveAsModal isOpen={saveModal} onClose={setSaveModal}  onSave={handleSaveFile}/>
      <ShareQuotationModal isOpen={shareModal} onClose={setShareModal} shareLink="http://localhost:5173/new-invoice/INV-04568"/>
      <section className="px-4 md:px-7 pt-6 md:pt-8 w-full bg-white min-h-screen">
        {/* Header */}
        <h2>Invoice ID: {generatedId}</h2>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">New Invoice</h1>

          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <button
              className="bg-[#F9F9F9] text-sm md:text-base rounded-lg px-3 py-2 flex items-center gap-2"
              onClick={togglePreview}
            >
              <EyeClosed size={16} />
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>

            <button
              onClick={() => setSaveModal(true)}
              className="bg-[#1C2730]  text-sm md:text-base text-white rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <Folder size={16} />
              Save as Draft
            </button>

            <button
              onClick={() => setShareModal(true)}
              className="bg-[#F9F9F9] text-sm md:text-base rounded-lg px-3 py-2 flex items-center gap-2"
            >
              <Send size={16} />
              Send Invoice
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div
          className={`grid gap-6 mt-6 ${
            showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* LEFT FORM SECTION */}
          <div className="bg-[#C2C2C21F] rounded-lg border-2 border-[#C2C2C21F] px-4 sm:px-5 pt-4 pb-8 min-h-[500px]">
            <div className="flex flex-col justify-between h-full">
              {/* Tabs */}
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {["Customer Details", "Add Product", "Price Summary"].map(
                    (tab, index) => (
                      <button
                        key={index}
                        onClick={() => settabState(tab)}
                        className={`text-xs font-bold px-2 py-[6px] rounded-2xl border-2
                      ${
                        tabState === tab
                          ? "bg-[#007AFF] text-white border-[#007AFF]"
                          : "bg-white text-[#007AFF] border-[#007AFF]"
                      }`}
                      >
                        {tab}
                      </button>
                    )
                  )}

                  <button
                    className="text-xs text-[#007AFF] font-bold px-2 py-[6px]"
                    onClick={handleNext}
                  >
                    <MoveRight />
                  </button>
                </div>

                {/* Conditional Rendering */}
                {tabState === "Price Summary" ? (
                  <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {/* Sub Total */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Sub Total</label>
                      <input
                        type="text"
                        value={`${priceSummary.subTotal}`}
                        disabled
                        className="text-xs text-[#00000099] border-2 border-[#C7C7C7] rounded-lg pl-4 py-3 bg-gray-100"
                      />
                    </div>

                    {/* Total Discount Applied */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        Total Discount Applied
                      </label>
                      <input
                        type="text"
                        value={`${priceSummary.totalDiscount}`}
                        disabled
                        className="text-xs text-[#00000099] border-2 border-[#C7C7C7] rounded-lg pl-4 py-3 bg-gray-100"
                      />
                    </div>

                    {/* Total Tax Applied */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        Total Tax Applied
                      </label>
                      <input
                        type="text"
                        value={`${priceSummary.totalTax}`}
                        disabled
                        className="text-xs text-[#00000099] border-2 border-[#C7C7C7] rounded-lg pl-4 py-3 bg-gray-100"
                      />
                    </div>

                    {/* Grand Total */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">Grand Total</label>
                      <input
                        type="text"
                        value={`${priceSummary.grandTotal}`}
                        disabled
                        className="text-xs text-[#00000099] border-2 border-[#C7C7C7] rounded-lg pl-4 py-3 bg-gray-100 font-semibold"
                      />
                    </div>
                  </form>
                ) : tabState === "Add Product" ? (
                  // =================== ADD PRODUCT FORM ===================
                  <div>
                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                      {/* Product Name */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={productForm.productName}
                          onChange={(e) =>
                            handleProductChange("productName", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                          placeholder="Enter product name"
                        />
                      </div>

                      {/* Category */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Category</label>
                        <select
                          value={productForm.category}
                          onChange={(e) =>
                            handleProductChange("category", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        >
                          <option value="">Select</option>
                          <option>Construction</option>
                          <option>Electrical</option>
                          <option>Plumbing</option>
                        </select>
                      </div>

                      {/* Unit Measure */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Unit Measure
                        </label>
                        <select
                          value={productForm.unitMeasure}
                          onChange={(e) =>
                            handleProductChange("unitMeasure", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        >
                          <option value="">Select</option>
                          <option>Pcs</option>
                          <option>Kg</option>
                          <option>Box</option>
                        </select>
                      </div>

                      {/* Quantity */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">Quantity</label>
                        <input
                          type="number"
                          value={productForm.quantity}
                          onChange={(e) =>
                            handleProductChange("quantity", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      {/* Unit Price */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Unit Price ($)
                        </label>
                        <input
                          type="text"
                          value={productForm.unitPrice}
                          onChange={(e) =>
                            handleProductChange("unitPrice", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                          placeholder="0.00"
                        />
                      </div>

                      {/* Discount */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Discount Applied
                        </label>
                        <select
                          value={productForm.discount}
                          onChange={(e) =>
                            handleProductChange("discount", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        >
                          <option value="">Select</option>
                          <option>5</option>
                          <option>8</option>
                          <option>10</option>
                        </select>
                      </div>

                      {/* Tax */}
                      <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium">
                          Tax Applied
                        </label>
                        <select
                          value={productForm.tax}
                          onChange={(e) =>
                            handleProductChange("tax", e.target.value)
                          }
                          className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        >
                          <option value="">Select</option>
                          <option>2</option>
                          <option>5</option>
                          <option>8</option>
                        </select>
                      </div>
                    </form>

                    {/* Added Products List */}
                    {products.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold mb-3">
                          Added Products:
                        </h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {products.map((product, index) => (
                            <div
                              key={product.id}
                              className="flex justify-between items-center bg-white p-3 rounded-lg border"
                            >
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {product.productName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Qty: {product.quantity} | Price: $
                                  {product.unitPrice}
                                </p>
                              </div>
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="text-red-500 text-xs font-semibold ml-2"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : tabState === "Customer Details" ? (
                  // =================== CUSTOMER DETAILS FORM ===================
                  <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                    {/* Customer Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={customerForm.customerName}
                        onChange={(e) =>
                          handleCustomerChange("customerName", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter customer name"
                      />
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={customerForm.companyName}
                        onChange={(e) =>
                          handleCustomerChange("companyName", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter company name"
                      />
                    </div>

                    {/* Delivery Address - Full Width */}
                    <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
                      <label className="text-sm font-medium">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        value={customerForm.deliveryAddress}
                        onChange={(e) =>
                          handleCustomerChange(
                            "deliveryAddress",
                            e.target.value
                          )
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter delivery address"
                      />
                    </div>

                    {/* City - 1st in row */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">City</label>
                      <select
                        value={customerForm.city}
                        onChange={(e) =>
                          handleCustomerChange("city", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                      >
                        <option value="">Select</option>
                        <option>Houston</option>
                        <option>Dallas</option>
                        <option>Austin</option>
                      </select>
                    </div>

                    {/* State - 2nd in row */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">State</label>
                      <input
                        type="text"
                        value={customerForm.state}
                        onChange={(e) =>
                          handleCustomerChange("state", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter state"
                      />
                    </div>

                    {/* Postal Code - 3rd in row */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">Postal Code</label>
                      <input
                        type="text"
                        value={customerForm.postalCode}
                        onChange={(e) =>
                          handleCustomerChange("postalCode", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter postal code"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        type="email"
                        value={customerForm.email}
                        onChange={(e) =>
                          handleCustomerChange("email", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter email"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={customerForm.phone}
                        onChange={(e) =>
                          handleCustomerChange("phone", e.target.value)
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        placeholder="Enter phone number"
                      />
                    </div>

                    {/* Special Instruction - Full Width */}
                    <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
                      <label className="text-sm font-medium">
                        Special Instruction
                      </label>
                      <textarea
                        value={customerForm.specialInstruction}
                        onChange={(e) =>
                          handleCustomerChange(
                            "specialInstruction",
                            e.target.value
                          )
                        }
                        className="text-sm border-2 border-[#C7C7C7] rounded-lg px-3 sm:px-4 py-2"
                        rows="3"
                        placeholder="Enter special instructions"
                      />
                    </div>
                  </form>
                ) : (
                  <p className="mt-4 text-sm text-gray-600">
                    Select a tab to continue
                  </p>
                )}
              </div>

              {/* Submit Button Only Visible on Price Summary */}
              {tabState === "Price Summary" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                  <button
                    className="bg-black text-white text-base rounded-lg py-2 sm:py-3"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              )}

              {/* Add New Product Button - Only Visible on Add Product Tab */}
              {tabState === "Add Product" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                  <button
                    className="bg-black text-white text-base rounded-lg py-2 sm:py-3"
                    onClick={handleAddProduct}
                  >
                    Add New Product
                  </button>
                </div>
              )}

              {/* Next Button - Only Visible on Customer Details Tab */}
              {tabState === "Customer Details" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                  <button
                    className="bg-black text-white text-base rounded-lg py-2 sm:py-3"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PREVIEW SECTION - Conditionally Rendered */}
          {showPreview && (
            <div 
             ref={invoiceRef}
            className="bg-[#C2C2C21F] flex flex-col rounded-lg border-2 border-[#C2C2C21F] px-4 sm:px-5 pt-4 pb-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-16 sm:w-20 object-contain"
                />
                <p className="text-right text-sm font-semibold">
                  19th Street, Mckinney Walker <br />
                  Jaddah <br />
                  +1-0281-856-6521
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-between border-b-2 border-[#008CFF] mt-3 pb-3 gap-3">
                <p className="text-sm font-semibold leading-6">
                  Invoice Number : INV-04568 <br />
                  Date Issued : Nov 01, 2025 <br />
                  Due Date : Nov 10, 2025 <br />
                  07526
                </p>
                <p className="text-right text-sm font-semibold leading-6">
                  {customerForm.customerName || "Customer Name"} <br />
                  {customerForm.email || "customer@email.com"} <br />
                  {customerForm.city || "City"}, {customerForm.state || "State"}{" "}
                  <br />
                  {customerForm.postalCode || "Postal Code"}
                </p>
              </div>

              <p className="text-sm font-semibold leading-6 mt-3">
                Project Description:
                <br />
                <span className="font-normal">
                  {customerForm.specialInstruction ||
                    "No special instructions provided"}
                </span>
              </p>

              <div className="flex flex-col gap-4 sm:gap-5 mt-3 flex-grow">
                <p className="font-semibold text-sm">Product Details :</p>

                <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center text-xs sm:text-sm">
                  {[
                    "S.no",
                    "Product Name",
                    "Quantity",
                    "Unit Price",
                    "Discount %",
                    "Tax %",
                  ].map((h, i) => (
                    <span
                      key={i}
                      className="bg-[#DCEEFF] rounded-2xl border-2 border-[#007AFF] text-[#007AFF] px-1 sm:px-2 py-1 truncate"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Dynamic Products - Show actual products or empty state */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-6 gap-1 sm:gap-2 text-center text-xs">
                    {[
                      products.map((product, index) =>
                        (index + 1).toString().padStart(2, "0")
                      ),
                      products.map((product) => product.productName || "N/A"),
                      products.map(
                        (product) =>
                          `${product.quantity || "0"}${
                            product.unitMeasure || "pcs"
                          }`
                      ),
                      products.map((product) => `${product.unitPrice || "0"}`),
                      products.map((product) => `${product.discount || "0"}%`),
                      products.map((product) => `${product.tax || "0"}%`),
                    ].map((col, i) => (
                      <div key={i} className="flex flex-col gap-1 sm:gap-2">
                        {col.map((item, j) => (
                          <span key={j} className="font-light truncate">
                            {item}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No products added yet
                  </div>
                )}

                {/* Price Summary in Preview */}
                <div className="border-t-2 border-[#008CFF] pt-3 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Sub Total:</span>
                    <span>${priceSummary.subTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Discount:</span>
                    <span>${priceSummary.totalDiscount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Tax:</span>
                    <span>${priceSummary.totalTax}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-gray-300 mt-2 pt-2">
                    <span>Grand Total:</span>
                    <span>${priceSummary.grandTotal}</span>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-[#008CFF] pt-2 mt-4">
                <p className="text-sm font-semibold">Terms & Conditions :</p>
                <p className="text-sm font-normal">
                  Above information is not an invoice and only an estimate.
                </p>
                <p className="text-sm font-semibold mt-1">
                  Please Confirm Your Acceptance Of This Quote
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NewInvoice;
