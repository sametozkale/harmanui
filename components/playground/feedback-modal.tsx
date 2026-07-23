"use client";

import { useCallback, useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
  useOverlayState,
} from "@heroui/react";
import { Check } from "@/lib/icons";
import {
  playgroundTabMenuButtonClass,
} from "@/components/playground/constants";

export type FeedbackType = "bug" | "feature" | "general";

export type FeedbackPayload = {
  type: FeedbackType;
  message: string;
  email?: string;
};

type Phase = "form" | "loading" | "success";

const FEEDBACK_TYPES: ReadonlyArray<{ id: FeedbackType; label: string }> = [
  { id: "general", label: "General" },
  { id: "bug", label: "Bug" },
  { id: "feature", label: "Feature" },
];

const FOOTER_LINK_CLASS =
  "flex h-10 shrink-0 cursor-pointer items-center rounded-xl px-3.5 text-[13px] font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 active:scale-[0.97] md:h-9";

async function submitFeedback(_payload: FeedbackPayload): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600));
}

function resetFormState(
  setType: (v: FeedbackType) => void,
  setMessage: (v: string) => void,
  setEmail: (v: string) => void,
  setPhase: (v: Phase) => void,
) {
  setType("general");
  setMessage("");
  setEmail("");
  setPhase("form");
}

export function FeedbackModal() {
  const [type, setType] = useState<FeedbackType>("general");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<Phase>("form");

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        resetFormState(setType, setMessage, setEmail, setPhase);
      }
    },
    [],
  );

  const state = useOverlayState({ onOpenChange: handleOpenChange });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || phase === "loading") return;

    setPhase("loading");
    try {
      await submitFeedback({
        type,
        message: message.trim(),
        email: email.trim() || undefined,
      });
      setPhase("success");
    } catch {
      setPhase("form");
    }
  };

  return (
    <>
      <button type="button" onClick={state.open} className={FOOTER_LINK_CLASS}>
        Feedback
      </button>

      <Modal state={state}>
        <Modal.Backdrop>
          <Modal.Container size="md">
            <Modal.Dialog className="sm:max-w-[420px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading>
                  {phase === "success" ? "Thanks for your feedback" : "Send feedback"}
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body>
                {phase === "success" ? (
                  <div className="flex flex-col items-center gap-3 py-4 text-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="size-5" strokeWidth={2.5} />
                    </div>
                    <p className="text-[14px] leading-relaxed text-zinc-600">
                      Your message was recorded. We appreciate you helping improve Harman UI.
                    </p>
                  </div>
                ) : (
                  <form id="feedback-form" onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="space-y-2">
                      <legend className="text-[12px] font-medium text-zinc-600">Type</legend>
                      <div
                        className="inline-flex h-9 w-fit shrink-0 gap-0.5 rounded-xl bg-zinc-100 p-0.5"
                        role="radiogroup"
                        aria-label="Feedback type"
                      >
                        {FEEDBACK_TYPES.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={type === option.id}
                            onClick={() => setType(option.id)}
                            className={playgroundTabMenuButtonClass(type === option.id)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </fieldset>

                    <TextField isRequired>
                      <Label>Message</Label>
                      <TextArea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you think…"
                        rows={4}
                        disabled={phase === "loading"}
                      />
                    </TextField>

                    <TextField>
                      <Label>Email (optional)</Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        disabled={phase === "loading"}
                      />
                    </TextField>
                  </form>
                )}
              </Modal.Body>

              <Modal.Footer>
                {phase === "success" ? (
                  <Button slot="close" variant="primary" onPress={state.close}>
                    Done
                  </Button>
                ) : (
                  <>
                    <Button slot="close" variant="tertiary" isDisabled={phase === "loading"}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      form="feedback-form"
                      variant="primary"
                      isDisabled={!message.trim() || phase === "loading"}
                    >
                      {phase === "loading" ? "Sending…" : "Send feedback"}
                    </Button>
                  </>
                )}
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
