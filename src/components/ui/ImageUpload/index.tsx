import { Trash2 } from 'lucide-react';
import React from 'react'

interface Props {
    selectedImage: File | undefined;
    setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
    placeholder?: string;
}

export const ImageUploader = ({ selectedImage, setSelectedImage, placeholder }: Props) => {
    return (
        <>
            {selectedImage ? (
                <div>
                    <div className="relative">
                        <img
                            alt="not found"
                            className="w-32 h-32 rounded-3xl object-contain"
                            src={
                                typeof selectedImage === "string"
                                    ? selectedImage
                                    : URL.createObjectURL(selectedImage)
                            }
                        />
                        <br />
                        <Trash2 className="w-6 h-6 text-red-500 cursor-pointer absolute top-0 right-0" onClick={() => setSelectedImage(undefined)} />
                    </div>
                </div>) : (
                <>
                    <div className="w-32 h-32 relative rounded-3xl flex justify-center items-center border-4">
                        <span className="text-gray-500 text-xs text-center">{placeholder || "اضغط لاضافة صورة"}</span>
                        <input
                            type="file"
                            name="myImage"
                            className="border-0 w-32 h-32 absolute top-0 left-0 opacity-0 cursor-pointer"
                            onChange={(event) => {
                                setSelectedImage(event.target.files?.[0]);
                            }}
                        />
                    </div>
                </>
            )}</>
    )
}
