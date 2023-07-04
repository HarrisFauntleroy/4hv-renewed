import { Button, Flex, Stack } from "@chakra-ui/react";
import { Step as ChakraStep, Steps, useSteps } from "chakra-ui-steps";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { FiCheckCircle } from "react-icons/fi";

type Step = {
  label: string;
  content: ReactNode;
  icon: IconType;
  description: string;
  key: string;
};

interface StepperProps {
  steps: Step[];
}

const Stepper = ({ steps }: StepperProps) => {
  const {
    nextStep,
    prevStep,
    reset: resetSteps,
    activeStep,
  } = useSteps({
    initialStep: 0,
  });

  return (
    <Stack>
      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx="auto" size="sm" onClick={resetSteps}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="space-between">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
      <Steps
        orientation="vertical"
        activeStep={activeStep}
        checkIcon={FiCheckCircle}
      >
        {steps.map(({ label, content }) => (
          <ChakraStep label={label} key={label}>
            {content}
          </ChakraStep>
        ))}
      </Steps>
    </Stack>
  );
};

export default Stepper;
