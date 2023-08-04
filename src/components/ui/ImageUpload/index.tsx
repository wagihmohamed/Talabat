import { Trash2 } from 'lucide-react';
import React from 'react'

interface Props {
    selectedImage: File | undefined;
    setSelectedImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const ImageUploader = ({ selectedImage, setSelectedImage }: Props) => {
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
                    <div className="w-32 h-32 relative bg-gray-100 rounded-3xl flex justify-center items-center">
                        اختيار صوره
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
