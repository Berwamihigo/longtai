"use client";

import { useState } from "react";

const categories = ["SUV", "Sedan", "Coupe", "Hatchback", "Convertible", "Truck", "Van"];
const powerTypes = ["Electric", "Hybrid", "Engine Powered"];

export default function CarUploadPage() {
  const [carName, setCarName] = useState("");
  const [make, setMake] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [mpg, setMpg] = useState("");
  const [tankCapacity, setTankCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState("");
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [zeroToSixty, setZeroToSixty] = useState("");
  const [powerType, setPowerType] = useState("");
  const [fullCharge, setFullCharge] = useState("");
  const [range, setRange] = useState("");
  const [fullTank, setFullTank] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mpgRange, setMpgRange] = useState({ min: "", max: "" });
  const [price, setPrice] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [mileage, setMileage] = useState("");
  const [subDragActive, setSubDragActive] = useState(false);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleSubImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSubImages(Array.from(e.target.files));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg("");

    if (!carName || !mainImage) {
      alert("Car name and main image are required.");
      return;
    }

    try {
      const mainBase64 = await convertToBase64(mainImage);
      const subBase64Array = await Promise.all(subImages.map(convertToBase64));

      const uploadRes = await fetch("/api/uploadToCloudinary", {
        method: "POST",
        body: JSON.stringify({
          mainImage: mainBase64,
          subImages: subBase64Array,
        }),
      });

      const uploadData = await uploadRes.json();
      if (!uploadData.success) throw new Error(uploadData.message);

      setMainImageUrl(uploadData.mainImageUrl);
      setSubImageUrls(uploadData.subImageUrls);

      const carData: any = {
        carName,
        make,
        chassisNumber,
        category,
        year,
        seats,
        transmission,
        mileage,
        zeroToSixty,
        powerType,
        price,
        description,
        mainImageUrl: uploadData.mainImageUrl,
        subImageUrls: uploadData.subImageUrls,
      };

      if (powerType === "Electric") {
        carData.fullCharge = fullCharge;
        carData.range = range;
      }
      if (powerType === "Hybrid" || powerType === "Engine Powered") {
        carData.fullTank = fullTank;
        carData.mpgRange = mpgRange;
      }

      const saveRes = await fetch("/api/saveToFirebase", {
        method: "POST",
        body: JSON.stringify(carData),
      });

      const saveData = await saveRes.json();
      if (!saveData.success) throw new Error(saveData.message);

      setSuccessMsg("🚗 Car uploaded and saved successfully!");
    } catch (err: any) {
      setSuccessMsg(`❌ Upload failed: ${err.message}`);
    }
  };

  const handleMainDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragover");
  };

  const handleMainDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) setMainImage(e.dataTransfer.files[0]);
  };

  const handleSubDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSubDragActive(e.type === "dragover");
  };

  const handleSubDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setSubDragActive(false);
    if (e.dataTransfer.files) setSubImages(Array.from(e.dataTransfer.files));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Upload Car Details</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Car Name"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          required
          className="p-3 border rounded-md"
        />
        <input
          type="text"
          placeholder="Car Make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          className="p-3 border rounded-md"
        />
        <input
          type="text"
          placeholder="Chassis Number"
          value={chassisNumber}
          onChange={(e) => setChassisNumber(e.target.value)}
          className="p-3 border rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="p-3 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-3 border rounded-md"
        />
        <input
          type="number"
          placeholder="Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          className="p-3 border rounded-md"
        />
        <input
          type="text"
          placeholder="Transmission"
          value={transmission}
          onChange={(e) => setTransmission(e.target.value)}
          className="p-3 border rounded-md"
        />
        <input
          type="number"
          placeholder="Mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          className="p-3 border rounded-md"
        />
        <input
          type="text"
          placeholder="0-60 mph (sec)"
          value={zeroToSixty}
          onChange={(e) => setZeroToSixty(e.target.value)}
          className="p-3 border rounded-md"
        />
        <select
          value={powerType}
          onChange={(e) => setPowerType(e.target.value)}
          required
          className="p-3 border rounded-md"
        >
          <option value="">Select Power Type</option>
          {powerTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {powerType === "Electric" && (
          <>
            <input
              type="text"
              placeholder="Full Charge (kWh)"
              value={fullCharge}
              onChange={(e) => setFullCharge(e.target.value)}
              className="p-3 border rounded-md"
            />
            <input
              type="text"
              placeholder="Range (miles)"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="p-3 border rounded-md"
            />
          </>
        )}
        {(powerType === "Hybrid" || powerType === "Engine Powered") && (
          <>
            <input
              type="text"
              placeholder="Full Tank (gallons)"
              value={fullTank}
              onChange={(e) => setFullTank(e.target.value)}
              className="p-3 border rounded-md"
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="MPG Min"
                value={mpgRange.min}
                onChange={(e) => setMpgRange({ ...mpgRange, min: e.target.value })}
                className="p-3 border rounded-md w-1/2"
              />
              <input
                type="number"
                placeholder="MPG Max"
                value={mpgRange.max}
                onChange={(e) => setMpgRange({ ...mpgRange, max: e.target.value })}
                className="p-3 border rounded-md w-1/2"
              />
            </div>
          </>
        )}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-3 border rounded-md"
        />
        <textarea
          placeholder="Vehicle Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="col-span-1 md:col-span-2 p-3 border rounded-md"
        />
        <div
          className={`col-span-1 border-2 border-dashed rounded-md p-4 text-center ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={handleMainDrag}
          onDragLeave={handleMainDrag}
          onDrop={handleMainDrop}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Main Image (Drag & Drop or Click)</label>
          <input
            type="file"
            onChange={handleMainImageChange}
            accept="image/*"
            required
            className="hidden"
            id="mainImageInput"
          />
          <label htmlFor="mainImageInput" className="cursor-pointer text-blue-600 underline">
            Choose File
          </label>
          {mainImage && <div className="mt-2 text-green-600">{mainImage.name}</div>}
        </div>
        <div
          className={`col-span-1 border-2 border-dashed rounded-md p-4 text-center ${subDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          onDragOver={handleSubDrag}
          onDragLeave={handleSubDrag}
          onDrop={handleSubDrop}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">Sub Images (Drag & Drop or Click)</label>
          <input
            type="file"
            onChange={handleSubImagesChange}
            accept="image/*"
            multiple
            className="hidden"
            id="subImagesInput"
          />
          <label htmlFor="subImagesInput" className="cursor-pointer text-blue-600 underline">
            Choose Files
          </label>
          {subImages.length > 0 && <div className="mt-2 text-green-600">{subImages.length} file(s) selected</div>}
        </div>
        <div className="col-span-1 md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg shadow-md transition-all w-full md:w-auto"
          >
            Upload Car
          </button>
        </div>
      </form>
      {successMsg && (
        <div className="mt-8 p-4 rounded bg-green-100 text-green-700 font-medium text-center">
          {successMsg}
        </div>
      )}
      {/* {mainImageUrl && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Main Image:</h2>
          <img src={mainImageUrl} alt="Main car" className="w-64 rounded" />
          <a
            href={mainImageUrl}
            target="_blank"
            className="block text-blue-600 underline mt-2"
          >
            {mainImageUrl}
          </a>
        </div>
      )}
      {subImageUrls.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Sub Images:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {subImageUrls.map((url, i) => (
              <div key={i}>
                <img src={url} alt={`Sub ${i}`} className="w-full rounded" />
                <a
                  href={url}
                  target="_blank"
                  className="block text-blue-600 underline mt-1"
                >
                  {url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
