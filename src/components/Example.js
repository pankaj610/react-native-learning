import * as React from 'react'
import {Button, Text, TextInput, View} from 'react-native'

export function Example() {
    const [name, setUser] = React.useState('')
    const [show, setShow] = React.useState(false)
  
    return (
      <View>
        <TextInput value={name} onChangeText={setUser} testID="input" />
        <Button
          title="Click here!"
          onPress={() => {
            // let's pretend this is making a server request, so it's async
            // (you'd want to mock this imaginary request in your unit tests)...
            setTimeout(() => {
              setShow(true)
            }, Math.floor(Math.random() * 200))
          }}
        />
        {show && <Text testID="output">{name}</Text>}
      </View>
    )
  }
 