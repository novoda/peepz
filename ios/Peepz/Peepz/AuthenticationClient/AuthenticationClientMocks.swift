import Combine

extension AuthenticationClient {
    static var mock: AuthenticationClient {
        let subject = CurrentValueSubject<Bool, Never>(true)
        return AuthenticationClient(authenticated: subject.eraseToAnyPublisher(),
                                    signin: { subject.send(true) },
                                    signOut: { subject.send(false) },
                                    restore: { _ in /* no op */ })
    }
}
