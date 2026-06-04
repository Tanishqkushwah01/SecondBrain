import Card from "./ui/card";
import Button from "./ui/button";

interface DeleteCardProps {
    title: string;
    link: string;
    onDelete: () => void;
    onClose: () => void;
}

export default function DeleteCard({
    title,
    link,
    onDelete,
    onClose,
}: DeleteCardProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <Card variant="none" size="none" className="bg-white dark:bg-[#111827] rounded-xl p-6 w-100 shadow-lg text-gray-800 dark:text-[#F8FAFC] transition-colors duration-200">
                <h2 className="text-xl font-bold mb-4 dark:text-[#F8FAFC] transition-colors duration-200">
                    Delete Content
                </h2>

                <div className="border rounded-lg p-4 mb-4 dark:border-[#1E293B] dark:bg-[#0C111C] transition-colors duration-200">
                    <h3 className="font-semibold">{title}</h3>

                    <p className="text-sm text-gray-500 dark:text-[#94A3B8] mt-2 break-all transition-colors duration-200">
                        {link}
                    </p>
                </div>

                <p className="text-red-500 text-sm mb-4">
                    This action cannot be undone.
                </p>

                {/* <div className="flex justify-end gap-3">
          <Button
            text="Cancel"
            variant="Dark"
            onClick={onClose}
          />

          <Button
            text="Delete"
            variant="Light"
            onClick={onDelete}
          />
        </div> */}
                <div className="flex justify-end gap-3">
                    <Button
                        variant="none"
                        size="none"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-[#1E293B] text-gray-800 dark:text-[#F8FAFC] hover:bg-gray-300 dark:hover:bg-[#334155] cursor-pointer transition-all duration-300"
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="none"
                        size="none"
                        onClick={onDelete}
                        className="px-4 py-2 rounded-xl bg-blue-600 dark:bg-[#FF4D5A] hover:bg-blue-700 dark:hover:opacity-90 text-white cursor-pointer transition-all duration-300"
                    >
                        Delete
                    </Button>
                </div>

            </Card>
        </div>
    );
}