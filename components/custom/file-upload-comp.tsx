import React, { useState } from "react";
import { Button } from "../ui/button";
import { IconPaperclip } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUpload } from "../ui/file-upload";
import { CopyX, Upload } from "lucide-react";
import { ref, uploadBytesResumable } from "firebase/storage";
import { toast } from "sonner";
import { STORAGE } from "@/db/firebase/config";

export default function FileUploadComp({ disabled }: { disabled: boolean }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isFile, setIsFile] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileRemove = () => {
    setFiles([]);
    setIsFile(false);
    setResetKey((prevKey) => prevKey + 1);
  };

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setIsFile(uploadedFiles.length > 0);
    console.log(uploadedFiles);
  };

  const handleUpload = () => {
    if (!files.length) return;

    setUploading(true);

    files.forEach((file) => {
      const fileType = file.type.split("/")[1];

      let folderPath;
      if (fileType === "pdf") {
        folderPath = "pdfs";
      } else if (fileType === "csv") {
        folderPath = "csvs";
      } else if (fileType === "plain") {
        folderPath = "txts";
      } else {
        toast("Unsupported File Type", {
          description: "We don't support this file type.",
        });
        handleFileRemove();
        return;
      }

      const storageRef = ref(STORAGE, `${folderPath}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.loading("Uploading...", {
            description: `Upload is ${Math.round(progress)}% complete for ${file.name}.`,
          });

          if (progress === 100) {
            toast.success("Upload Complete", {
              description: `${file.name} has been successfully uploaded.`,
            });
          }
        },
        (error) => {
          console.error("Upload failed:", error);
          setUploading(false);
          toast.error("Upload Failed", {
            description: `Failed to upload ${file.name}. Please try again.`,
          });
        },
        () => {
          setUploading(false);
          handleFileRemove(); // Optionally reset the file input after upload
        },
      );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-auto h-full items-center justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-transparent"
            disabled={disabled}
          >
            <IconPaperclip className="h-6 w-6 text-white" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full max-h-96 items-end justify-center">
        <DialogHeader className="w-full max-w-4xl mx-auto h-full">
          <DialogTitle className="font-bold text-muted dark:text-white text-2xl">
            Upload file
          </DialogTitle>
          <DialogDescription>
            Drag or drop your file here or click to upload.
          </DialogDescription>
          <FileUpload
            key={resetKey}
            onChange={handleFileUpload}
            isDisabled={isFile || uploading}
          />
        </DialogHeader>
        <DialogFooter className="flex flex-row w-full items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            disabled={!isFile || uploading}
            onClick={handleFileRemove}
          >
            <CopyX className="size-5 mr-2" />
            Remove
          </Button>
          <Button
            type="button"
            disabled={!isFile || uploading}
            onClick={handleUpload}
          >
            {uploading ? "Uploading..." : "Upload"}
            <Upload className="size-5 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
