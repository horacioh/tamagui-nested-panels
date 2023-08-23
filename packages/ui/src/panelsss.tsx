import { X, Check as CheckIcon } from '@tamagui/lucide-icons'
import { useState } from 'react'
import {
  Button,
  Checkbox,
  CheckboxProps,
  Dialog,
  DialogProps,
  Fieldset,
  Input,
  Label,
  Paragraph,
  Popover,
  SizableText,
  SizeTokens,
  TooltipSimple,
  Unspaced,
  XStack,
  YStack,
} from 'tamagui'
import { SelectDemoItem } from './select-demo'

export function Panelsss() {
  const [withKeepChildrenMounted, setKeepChildrenMounted] = useState(true)
  const popoverState = usePopoverState(false)
  const dialogState = usePopoverState(false)
  return (
    <>
      <CheckboxWithLabel
        size="$3"
        defaultChecked={withKeepChildrenMounted}
        handleChange={(val) => setKeepChildrenMounted(val)}
        label="toggle keepChildrenMounted"
      />

      <Popover size="$5" allowFlip {...popoverState} keepChildrenMounted={withKeepChildrenMounted}>
        <Popover.Trigger asChild>
          <Button>Open Popover</Button>
        </Popover.Trigger>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

          <YStack space="$3">
            <SizableText size="$2">Some content...</SizableText>
            <DialogInstance
              {...dialogState}
              closePopover={() => popoverState.onOpenChange(false)}
            />

            <Popover.Close asChild>
              <Button
                size="$3"
                onPress={() => {
                  /* Custom code goes here, does not interfere with popover closure */
                }}
              >
                Submit
              </Button>
            </Popover.Close>
          </YStack>
        </Popover.Content>
      </Popover>
    </>
  )
}

function DialogInstance(props: DialogProps & { closePopover: () => void }) {
  return (
    <Dialog
      modal
      {...props}
      onOpenChange={(open) => {
        props.onOpenChange?.(open)
        if (open) {
          props.closePopover()
        }
      }}
    >
      <Dialog.Trigger asChild>
        <Button>Show Dialog</Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay key="overlay" opacity={0.5} />

        <Dialog.Content bordered elevate key="content" gap>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="name">
              Name
            </Label>
            <Input flex={1} id="name" defaultValue="Nate Wienert" />
          </Fieldset>
          <Fieldset gap="$4" horizontal>
            <Label width={160} justifyContent="flex-end" htmlFor="username">
              <TooltipSimple label="Pick your favorite" placement="bottom-start">
                <Paragraph>Food</Paragraph>
              </TooltipSimple>
            </Label>
            <SelectDemoItem />
          </Fieldset>

          <XStack alignSelf="flex-end" gap>
            <Dialog.Close displayWhenAdapted asChild>
              <Button theme="alt1" aria-label="Close">
                Save changes
              </Button>
            </Dialog.Close>
          </XStack>

          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

export const usePopoverState = (defaultOpen?: boolean) => {
  const [open, onOpenChange] = useState<boolean>(!!defaultOpen)
  return {
    open,
    onOpenChange,
    defaultOpen: !!defaultOpen,
  }
}

export function CheckboxWithLabel(props: {
  size: SizeTokens
  defaultChecked?: boolean
  label: string
  handleChange: CheckboxProps['onCheckedChange']
}) {
  const id = `checkbox-${props.size.toString().slice(1)}`
  return (
    <XStack width={300} alignItems="center" space="$4">
      <Checkbox
        id={id}
        size={props.size}
        defaultChecked={props.defaultChecked}
        onCheckedChange={props.handleChange}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  )
}
