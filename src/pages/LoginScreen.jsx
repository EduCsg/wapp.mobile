import { Text, View } from "react-native";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import {
  Button,
  ButtonSpinner,
  ButtonText,
  Input,
  InputIcon,
  InputSlot,
  InputField,
  ScrollView,
} from "@gluestack-ui/themed";

import { login } from "../service/AuthService";
import { storeInCache } from "../utils/SecureStore";
import { CACHE_KEYS } from "../constants/Cache";
import { colors } from "../styles/Colors";
import { layouts } from "../styles/Layouts";

export default function LoginScreen() {
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    if (!identification || !password) {
      setError("Preencha os campos corretamente!");
      setLoading(false);
      return;
    }

    await login(identification, password).then((res) => {
      if (!res.success) {
        setError(res.message);
        return;
      }

      storeInCache(CACHE_KEYS.USER_DATA, JSON.stringify(res.data));
      storeInCache(CACHE_KEYS.TOKEN, res.data.token);
    });

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={layouts.guestLayout}>
      <Text
        style={{
          fontSize: 40,
          color: colors.primary.main,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Wapp
      </Text>

      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        Bem-vindo ao Wapp!
      </Text>
      <Text
        style={{
          color: "white",
          marginBottom: 10,
          fontSize: 20,
        }}
      >
        Acesse sua conta!
      </Text>

      <View style={{ width: "80%" }}>
        <Text style={{ color: "white", marginBottom: 4 }}>
          Email ou Usuário
        </Text>

        <Input
          isDisabled={loading}
          size="lg"
          variant="outline"
          borderColor="$yellow500"
          borderWidth={1}
          borderRadius={5}
        >
          <InputField
            value={identification}
            onChangeText={setIdentification}
            backgroundColor={colors.generics.whiteOpacity}
            style={{ color: "white" }}
          />
        </Input>
      </View>

      <View style={{ width: "80%" }}>
        <Text style={{ color: "white", marginBottom: 4 }}>Senha</Text>

        <Input
          isDisabled={loading}
          size="lg"
          variant="outline"
          borderColor={colors.primary.main}
          borderWidth={1}
          borderRadius={5}
        >
          <InputField
            onChangeText={setPassword}
            value={password}
            secureTextEntry={!showPassword}
            backgroundColor={colors.generics.whiteOpacity}
            style={{ color: "white" }}
          />

          <InputSlot
            onPress={() => setShowPassword(!showPassword)}
            backgroundColor={colors.generics.whiteOpacity}
            pr="$4"
          >
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color={colors.primary.main}
            />
          </InputSlot>
        </Input>
        {error && (
          <Text
            style={{
              color: colors.error.main,
              marginTop: 5,
            }}
          >
            {error}
          </Text>
        )}
      </View>

      <View style={{ width: "80%", marginTop: 5 }}>
        <Button
          onPress={handleLogin}
          isLoading={loading}
          isDisabled={loading}
          style={{ marginTop: 10 }}
          backgroundColor={colors.primary.dark}
          borderRadius={5}
        >
          {loading && <ButtonSpinner mr="$2" />}

          <ButtonText color="black">
            {loading ? "Carregando..." : "Entrar"}
          </ButtonText>
        </Button>
      </View>

      <Text
        disabled={loading}
        style={{ color: colors.primary.main, marginTop: 5 }}
      >
        Esqueceu a senha?
      </Text>

      <Text disabled={loading} style={{ color: "white", paddingTop: 15 }}>
        Ainda não possui uma conta?
        <Text style={{ color: colors.primary.main }}>Cadastre-se</Text>
      </Text>
    </ScrollView>
  );
}
