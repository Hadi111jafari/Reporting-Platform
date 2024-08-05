import { Button } from "@/components/ui/button";
import { LayoutGridIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/googleAIModel";
import { OutputBlockData } from "@editorjs/editorjs";

const GenerateTemplateFromAIComponent = ({
  setGeneratedTemplate,
}: {
  setGeneratedTemplate: (template: OutputBlockData<string, any>[]) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTemplateFromAI = async () => {
    try {
      setLoading(true);
      const PROMPT = `Generate template for editor.js in JSON for "${userInput}"`;
      const result = await chatSession.sendMessage(PROMPT);
      const generatedTemplate = JSON.parse(result.response.text());
      setGeneratedTemplate(generatedTemplate);
      setOpen(false);
      setUserInput("");
    } catch (error) {
      console.error("Error generating template: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant={"outline"}
        className="flex gap-2"
        onClick={() => setOpen(true)}
      >
        <LayoutGridIcon className="w-4 h-4" />
        Generate AI Template
      </Button>

      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription>
              <h2 className="mb-2">What do you wanna write in the document?</h2>
              <Input
                id="input_ai"
                placeholder="Ex: Project Idea"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex justify-end mt-5 gap-4">
                <Button
                  variant={"ghost"}
                  onClick={() => {
                    setOpen(false);
                    setUserInput("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={generateTemplateFromAI}
                  disabled={!userInput || loading}
                >
                  {loading ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GenerateTemplateFromAIComponent;
